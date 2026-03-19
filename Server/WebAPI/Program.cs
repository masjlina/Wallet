using BusinessLogic.Dtos;
using BusinessLogic.Dtos.Mappers;
using BusinessLogic.Services;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi;
using WebAPI.Middlewares;
using WebAPI.Services;

LoadServerEnv(Path.Combine(Directory.GetCurrentDirectory(), ".env.local"));

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetSection("ConnStr").Value));
builder.Services.AddScoped<IMapper<ApplicationUser, ApplicationUserDto>, ApplicationUserMapper>();
builder.Services.AddScoped<IMapper<Wallet, WalletDto>, WalletMapper>();
builder.Services.AddScoped<IMapper<CreditCard, CreditCardDto>, CreditCardMapper>();
builder.Services.AddScoped<IMapper<Transaction, TransactionDto>, TransactionMapper>();
builder.Services.AddScoped<IMapper<Category, CategoryDto>, CategoryMapper>();

builder.Services.AddScoped<IApplicationUserService, ApplicationUserService>();
builder.Services.AddScoped<IWalletService, WalletService>();
builder.Services.AddScoped<ICreditCardService, CreditCardService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<IGenericService<CategoryDto>, CategoryService>();

builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.User.RequireUniqueEmail = true;
    options.User.AllowedUserNameCharacters = null;
}).AddEntityFrameworkStores<ApplicationDbContext>();

var apiSettingsSection = builder.Configuration.GetSection("Authentication:Schemes:Bearer");
builder.Services.Configure<ApiSettings>(option =>
{
    option.ValidIssuer = apiSettingsSection["ValidIssuer"];
    option.ValidAudiences = apiSettingsSection.GetSection("ValidAudiences").Get<string[]>();
    option.SigningKey = apiSettingsSection["SigningKeys:0:Value"];
});

var apiSettings = apiSettingsSection.Get<ApiSettings>();
var signingKey = Convert.FromBase64String(apiSettingsSection["SigningKeys:0:Value"]);

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = apiSettings.ValidIssuer,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(signingKey),
        ValidateAudience = true,
        ValidAudiences = apiSettings.ValidAudiences,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

// builder.Services.AddAuthorizationBuilder()
//     .AddPolicy("IsAdmin", policyBuilder => policyBuilder
//         .RequireClaim("admin", "true"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(x =>
{
    x.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Wallet",
        Version = "v1"
    });

    x.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme,
        new OpenApiSecurityScheme
        {
            Name = HeaderNames.Authorization,
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "JWT Authorization header"
        });

//     x.AddSecurityDefinition(
//         "Bearer",
//         new OpenApiSecurityScheme
//         {
//             In = ParameterLocation.Header,
//             Type = SecuritySchemeType.Http
//         }
//     );
    x.AddSecurityRequirement(document => new() { [new OpenApiSecuritySchemeReference("Bearer", document)] = [] });
});


var allowedOrigins = (builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [])
    .Where(origin => !string.IsNullOrWhiteSpace(origin))
    .Select(origin => origin.Trim().TrimEnd('/'))
    .Distinct(StringComparer.OrdinalIgnoreCase)
    .ToArray();

if (builder.Environment.IsDevelopment())
{
    allowedOrigins = allowedOrigins
        .Concat(["http://localhost:5500"])
        .Distinct(StringComparer.OrdinalIgnoreCase)
        .ToArray();
}

if (allowedOrigins.Length == 0)
{
    throw new InvalidOperationException("Missing CORS configuration. Set Cors:AllowedOrigins.");
}

builder.Services.AddCors(o => o.AddPolicy("Wallet", policy =>
{
    policy.WithOrigins(allowedOrigins)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.WebRootPath, "uploads", "avatars")),
    RequestPath = "/api/uploads/avatars"
});

app.UseRouting();
app.UseCors("Wallet");
app.UseMiddleware<ExceptionMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints => endpoints.MapControllers());

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

app.Run();

static void LoadServerEnv(string filePath)
{
    if (!File.Exists(filePath))
    {
        return;
    }

    foreach (var rawLine in File.ReadAllLines(filePath))
    {
        var line = rawLine.Trim();

        if (string.IsNullOrWhiteSpace(line) || line.StartsWith('#'))
        {
            continue;
        }

        var separatorIndex = line.IndexOf('=');
        if (separatorIndex <= 0)
        {
            continue;
        }

        var key = line[..separatorIndex].Trim();
        if (string.IsNullOrWhiteSpace(key) || Environment.GetEnvironmentVariable(key) is not null)
        {
            continue;
        }

        var value = line[(separatorIndex + 1)..].Trim();
        if (value.Length >= 2 &&
            ((value.StartsWith('"') && value.EndsWith('"')) ||
             (value.StartsWith('\'') && value.EndsWith('\''))))
        {
            value = value[1..^1];
        }

        Environment.SetEnvironmentVariable(key, value);
    }
}
