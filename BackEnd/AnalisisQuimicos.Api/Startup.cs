using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.Services;
using AnalisisQuimicos.Infrastructure.Data;
using AnalisisQuimicos.Infrastructure.Filters;
using AnalisisQuimicos.Infrastructure.Interfaces;
using AnalisisQuimicos.Infrastructure.Options;
using AnalisisQuimicos.Infrastructure.Repositories;
using AnalisisQuimicos.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            //services.AddCors();
            services.AddCors(o => o.AddPolicy("LowCorsPolicy", builder => {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddControllers(options =>
            {
                options.Filters.Add<GlobalExceptionFilter>();
            });

            services.Configure<PasswordOptions>(Configuration.GetSection("PasswordOptions"));

            services.AddDbContext<YucodeDevelopmentJNC_AQContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ConStringAnalisisQuimicos"))
                );

            //services.AddDbContext<JNCT1Context>(options =>
            //    options.UseSqlServer(Configuration.GetConnectionString("ConStringJNegre"))
            //    );

            services.AddTransient<IUsuarioService, UsuarioService>();
            services.AddTransient<IFileUploadService, FileUploadService>();
            services.AddTransient<IParametrosElementoPlantaClienteService, ParametrosElementoPlantaClienteService>();
            services.AddTransient<IConfPlantasClienteService, ConfPlantasClienteService>();
            services.AddTransient<IConfNivelesPlantasClienteService, ConfNivelesPlantasClienteService>();
            services.AddTransient<IAnalisisNivelesPlantasClienteService, AnalisisNivelesPlantasClienteService>();
            services.AddTransient<IValorParametrosService, ValorParametrosService>();
            services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
            //services.AddScoped(typeof(IRepository<>), typeof(BaseRepositoryJNegre<>));
            services.AddTransient<IUnidadDeTrabajo, UnidadDeTrabajo>();
            //services.AddTransient<IUnidadDeTrabajoJNegre, UnidadDeTrabajoJNegre>();
            services.AddTransient<IPasswordService, PasswordService>();
            services.AddTransient<IPDFGeneratorService, PDFGeneratorService>();
            services.AddTransient<IClienteService, ClienteService>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Authentication:Issuer"],
                    ValidAudience = Configuration["Authentication:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Authentication:SecretKey"]))
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            /*app.UseCors(options =>
            {
                options.WithOrigins("http://localhost:3000");
                options.AllowAnyMethod();
                options.AllowAnyHeader();
            });
            */

            app.UseCors("LowCorsPolicy");

            app.UseHttpsRedirection();
            app.UseRouting();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
