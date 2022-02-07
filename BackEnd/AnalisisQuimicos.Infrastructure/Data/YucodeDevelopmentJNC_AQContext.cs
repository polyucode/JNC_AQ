using System;
using System.Reflection;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Infrastructure.Data.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AnalisisQuimicos.Infrastructure.Data
{
    public partial class YucodeDevelopmentJNC_AQContext : DbContext
    {
        public YucodeDevelopmentJNC_AQContext()
        {
        }

        public YucodeDevelopmentJNC_AQContext(DbContextOptions<YucodeDevelopmentJNC_AQContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Analisis> GesAnalisis { get; set; }
        public virtual DbSet<Clientes> GesClientes { get; set; }
        public virtual DbSet<AnalisisNivelesPlantasCliente> GesConfAnalisisNivelesPlantasCliente { get; set; }
        public virtual DbSet<NivelesPlantasCliente> GesConfNivelesPlantasCliente { get; set; }
        public virtual DbSet<ConfPlantasCliente> GesConfPlantasCliente { get; set; }
        public virtual DbSet<ElementosPlanta> GesElementosPlanta { get; set; }
        public virtual DbSet<PlantasCliente> GesPlantasCliente { get; set; }
        public virtual DbSet<ServMantenimientoCab> GesServMantenimientoCab { get; set; }
        public virtual DbSet<ServMantenimientoDet> GesServMantenimientoDet { get; set; }
        public virtual DbSet<Comarcas> LstComarcas { get; set; }
        public virtual DbSet<Poblaciones> LstPoblaciones { get; set; }
        public virtual DbSet<Provincias> LstProvincias { get; set; }
        public virtual DbSet<Perfiles> SysPerfiles { get; set; }
        public virtual DbSet<Usuarios> SysUsuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
