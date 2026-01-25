using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using BusinessLogic.Services;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi;
using WebAPI.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetSection("ConnStr").Value));
builder.Services.AddScoped<IMapper<ApplicationUser, ApplicationUserDTO>, ApplicationUserMapper>();
builder.Services.AddScoped<IMapper<Wallet, WalletDTO>, WalletMapper>();
builder.Services.AddScoped<IMapper<CreditCard, CreditCardDTO>, CreditCardMapper>();
builder.Services.AddScoped<IMapper<Transaction, TransactionDTO>, TransactionMapper>();
builder.Services.AddScoped<IMapper<Category, CategoryDTO>, CategoryMapper>();

builder.Services.AddScoped<IApplicationUserService, ApplicationUserService>();
builder.Services.AddScoped<IGenericService<WalletDTO>, WalletService>();
builder.Services.AddScoped<IGenericService<CreditCardDTO>, CreditCardService>();
builder.Services.AddScoped<IGenericService<TransactionDTO>, TransactionService>();
builder.Services.AddScoped<IGenericService<CategoryDTO>, CategoryService>();

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


builder.Services.AddCors(o => o.AddPolicy("Wallet", policy =>
{
    policy.WithOrigins("http://localhost:5500")
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

app.UseRouting();
app.UseCors("Wallet");
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints => endpoints.MapControllers());

app.Run();