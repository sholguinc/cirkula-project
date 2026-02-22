using Backend.Context;
using Backend.Data;
using Backend.Services;
using DotNetEnv;
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

// Add Services
builder.Services.AddScoped<StoreService>();

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Swagger config
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Define Seeed
if (args.Contains("seed"))
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    Seeder.Run(context);
    return;
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseSwagger();

app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
