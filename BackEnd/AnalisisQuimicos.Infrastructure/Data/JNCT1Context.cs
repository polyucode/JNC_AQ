using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data
{
    public partial class JNCT1Context : DbContext
    {
        public JNCT1Context()
        {
        }
        public JNCT1Context(DbContextOptions<JNCT1Context> options)
            : base(options)
        {
        }
        //public virtual DbSet<Clientes> GesFechasTrabajo { get; set; }
        //public virtual DbSet<Clientes> GesClientes { get; set; }
        //public virtual DbSet<AnalisisNivelesPlantasCliente> GesConfAnalisisNivelesPlantasCliente { get; set; }
        ////public virtual DbSet<NivelesPlantasCliente> GesConfNivelesPlantasCliente { get; set; }
        //public virtual DbSet<ConfPlantasCliente> GesConfPlantasCliente { get; set; }
        //public virtual DbSet<ElementosPlanta> GesElementosPlanta { get; set; }
        //public virtual DbSet<PlantasCliente> GesPlantasCliente { get; set; }
        //public virtual DbSet<ServMantenimientoCab> GesServMantenimientoCab { get; set; }
        //public virtual DbSet<ServMantenimientoDet> GesServMantenimientoDet { get; set; }
        //public virtual DbSet<Comarcas> LstComarcas { get; set; }
        //public virtual DbSet<Poblaciones> LstPoblaciones { get; set; }
        //public virtual DbSet<Provincias> LstProvincias { get; set; }
        //public virtual DbSet<Perfiles> SysPerfiles { get; set; }
        //public virtual DbSet<Usuarios> SysUsuarios { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(System.Reflection.Assembly.GetExecutingAssembly());
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
