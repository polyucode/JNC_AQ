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

        public virtual DbSet<Archivos> GesArchivos { get; set; }
        public virtual DbSet<Analisis> GesAnalisis { get; set; }
        public virtual DbSet<Clientes> GesClientes { get; set; }
        public virtual DbSet<ClientesContactos> GesClientesContactos { get; set; }
        public virtual DbSet<Tareas> GesTareas { get; set; }
        public virtual DbSet<Usuarios> GesUsuarios { get; set; }
        public virtual DbSet<AnalisisNivelesPlantasCliente> GesConfAnalisisNivelesPlantasCliente { get; set; }
        public virtual DbSet<ConfNivelesPlantasCliente> GesConfNivelesPlantasCliente { get; set; }
        public virtual DbSet<ConfPlantasCliente> GesConfPlantasCliente { get; set; }
        public virtual DbSet<ElementosPlanta> GesElementosPlanta { get; set; }
        public virtual DbSet<OfertasClientes> GesOfertasClientes { get; set; }
        public virtual DbSet<OfertasContactos> GesOfertasContactos { get; set; }
        public virtual DbSet<OfertasProductos> GesOfertasProductos { get; set; }
        public virtual DbSet<Consumos> GesConsumos { get; set; }
        public virtual DbSet<ObservacionesElementos> GesObservacionesElementos { get; set; }
        public virtual DbSet<ComentariosElementos> GesComentariosElementos { get; set; }
        public virtual DbSet<PlantasCliente> GesPlantasCliente { get; set; }
        public virtual DbSet<TareaArchivos> GesTareaArchivos { get; set; }
        public virtual DbSet<Files> GesFiles { get; set; }
        public virtual DbSet<HistorialCorreosEnviados> GesHistorialCorreosEnviados { get; set; }
        public virtual DbSet<ParametrosAnalisisPlanta> GesParametrosAnalisisPlanta { get; set; }
        public virtual DbSet<ParametrosElementoPlantaCliente> GesParametrosElementoPlantaCliente { get; set; }
        public virtual DbSet<ValorParametros> GesValorParametros { get; set; }
        public virtual DbSet<Tareas> GesServMantenimientoCab { get; set; }
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

        //AMF INI PRUEBAS TRABAJAR CON BBDD
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Server=ALBERTO-YUCODE\\SQLEXPRESS2019;Database=YC.Development.JNC_AQ;User Id=sa;Password=tu8-thuf");
            base.OnConfiguring(optionsBuilder);
        }
    }
}
