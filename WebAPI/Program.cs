using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using BusinessLogic.Services;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
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


builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(o => o.AddPolicy("Wallet", builder =>
{
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseHttpsRedirection();
app.UseCors("Wallet");
app.UseEndpoints(endpoints => endpoints.MapControllers());

app.Run();
