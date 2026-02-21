using Backend.Context;
using DotNetEnv;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Env config
Env.Load("../.env");

// DB config
var dbHost = Environment.GetEnvironmentVariable("MYSQL_HOST");
var dbPort = Environment.GetEnvironmentVariable("MYSQL_PORT");
var dbName = Environment.GetEnvironmentVariable("MYSQL_DATABASE");
var dbPassword = Environment.GetEnvironmentVariable("MYSQL_ROOT_PASSWORD");

var connectionString = $"Server={dbHost};Port={dbPort};Database={dbName};User=root;Password={dbPassword};";

// DB Context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
