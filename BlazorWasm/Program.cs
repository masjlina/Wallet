using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using BlazorWasm;
using BlazorWasm.Adapters;
using BlazorWasm.Adapters.IAdapters;
using BusinessLogic.DTOs;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.Configuration.GetValue<string>("BaseAPIUrl")) });
builder.Services.AddScoped<IApplicationUserAdapter, ApplicationUserAdapter>();
builder.Services.AddScoped<IGenericAdapter<WalletDTO>, WalletAdapter>();
builder.Services.AddScoped<IGenericAdapter<CreditCardDTO>, CreditCardAdapter>();
builder.Services.AddScoped<IGenericAdapter<TransactionDTO>, TransactionAdapter>();
builder.Services.AddScoped<IGenericAdapter<CategoryDTO>, CategoryAdapter>();

await builder.Build().RunAsync();