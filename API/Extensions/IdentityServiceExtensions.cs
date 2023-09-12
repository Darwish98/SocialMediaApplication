using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            // AddIdentityCore is used to add the services to the container but not to add the authentication middleware
            services.AddIdentityCore<AppUser>(opt => 
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            })
            // AddEntityFrameworkStores is used to add the user and role stores to the container
            .AddEntityFrameworkStores<DataContext>();


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));



            // AddAuthentication is used to add the authentication services to the container
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt => 
                {
                    // Add validation parameters
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        // ValidateIssuerSigningKey is used to validate the signing key
                        ValidateIssuerSigningKey = true,
                        // IssuerSigningKey is used to set the signing key
                        IssuerSigningKey = key,
                        // ValidateIssuer is used to validate the issuer
                        ValidateIssuer = false,
                        // ValidateAudience is used to validate the audience
                        ValidateAudience = false
                    };
                });




            // AddJwtBearer is used to add the JWT bearer authentication services to the container
            services.AddScoped<TokenService>();



            return services;
        }
        
    }
}