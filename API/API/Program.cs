using API.Data;
using API.Models;
using API.Repositories.Classes;
using API.Repositories.Interfaces;
using DotNetEnv;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.OData.ModelBuilder;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddOData(options =>
    {
        {
            var edm = new ODataConventionModelBuilder();
            edm.EntitySet<Asset>("Assets");
            edm.EntitySet<IssueReport>("IssueReports");
            edm.EntitySet<AssignmentHistory>("AssignmentHistories");

            options
                .AddRouteComponents("odata", edm.GetEdmModel())
                .Select()
                .Filter()
                .OrderBy()
                .Expand()
                .Count()
                .SetMaxTop(100);
        }
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Initialize .env
Env.Load();

// Add DB context with .env connection string
builder.Services.AddDbContext<AssetTrackerDB>(opt => opt.UseSqlServer(Environment.GetEnvironmentVariable("DB_CONNECTION_STRING")));

// Dependency Injection
builder.Services.AddScoped<IAssetRepository, AssetRepository>();
builder.Services.AddScoped<IAssignmentHistoryRepository, AssignmentHistoryRepository>();
builder.Services.AddScoped<IIssueReportRepository, IssueReportRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
