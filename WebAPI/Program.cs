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
builder.Services.AddScoped<IGenericService<WalletDTO, int>, GenericService<Wallet, WalletDTO, int>>();
builder.Services.AddScoped<IGenericService<CreditCardDTO, int>, GenericService<CreditCard, CreditCardDTO, int>>();
builder.Services.AddScoped<IGenericService<TransactionDTO, int>, GenericService<Transaction, TransactionDTO, int>>();
builder.Services.AddScoped<IGenericService<CategoryDTO, int>, GenericService<Category, CategoryDTO, int>>();


builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
