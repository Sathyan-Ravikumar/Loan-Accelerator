using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.RepositoryInterfaces;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using LoanAccelerator.Repo;
using LoanAccelerator.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<LoanAcceleratorContext>(Options => Options.UseSqlServer(builder.Configuration.GetConnectionString("dbconn")));

builder.Services.AddScoped<IPersonalService, PersonalService>();
builder.Services.AddScoped<IRepository<Personal, int>, PersonalRepository>();
builder.Services.AddScoped<IAddressService, AddressService>();
builder.Services.AddScoped<IRepository<Address, int>, AddressRepository>();
builder.Services.AddScoped<ILoanDocumentService, LoanDocumentService>();
builder.Services.AddScoped<IRepository<LoanDocument, int>, LoanDocumentRepository>();
builder.Services.AddScoped<ILoanService, LoanService>();
builder.Services.AddScoped<IRepository<Loan, int>, LoanTableRepository>();
builder.Services.AddScoped<IFinancialService, FinancialService>();
builder.Services.AddScoped<IRepository<Financial, int>, FinancialRepository>();
builder.Services.AddScoped<ILoanCategoryService, LoanCategoryService>();
builder.Services.AddScoped<IMasterRepository<LoanCategory, int>, LoanCategoryRepository>();
builder.Services.AddScoped<IFamilyService, FamilyService>();
builder.Services.AddScoped<IRepository<Family, int>, FamilyRepository>();
builder.Services.AddScoped<IEmploymentService, EmploymentService>();
builder.Services.AddScoped<IRepository<Employment, int>, EmploymentRepository>();
builder.Services.AddScoped<IEmergencyService, EmergencyService>();
builder.Services.AddScoped<IRepository<Emergency, int>, EmergencyRepository>();
builder.Services.AddScoped<IAppliedLoansAndApplicationStatusService, AppliedLoansAndAppliedStatusService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IUserService, UsersServices>();
builder.Services.AddScoped<ILoanService, LoanService>();
builder.Services.AddScoped<IEmploymentService, EmploymentService>();
builder.Services.AddScoped<IPersonalService, PersonalService>();
builder.Services.AddScoped<IFinancialService, FinancialService>();
builder.Services.AddScoped<IEmploymentService, EmploymentService>();
builder.Services.AddScoped<IEmploymentService, EmploymentService>();
builder.Services.AddScoped<Ilogin, Logincs>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IMasterRepository<Status, int>, StatusRepository>();
builder.Services.AddScoped<IMasterRepository<Document, int>, DocumentRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Policy", builder =>
    {
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
        builder.AllowAnyOrigin();
    });
});

// Configure JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:SecretKey"]!)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });



builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                 {
                     {
                           new OpenApiSecurityScheme
                             {
                                 Reference = new OpenApiReference
                                 {
                                     Type = ReferenceType.SecurityScheme,
                                     Id = "Bearer"
                                 }
                             },
                             new string[] {}

                     }
        });
});

var app = builder.Build();
// Configure the HTTP request pipeline.


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("Policy");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
