using System;
using System.Collections.Generic;
using System.Text;
using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class OfertasClientesConfiguration : IEntityTypeConfiguration<OfertasClientes>
    {
        public void Configure(EntityTypeBuilder<OfertasClientes> builder)
        {
            builder.HasKey(e => e.Id);

            builder.ToTable("GES_OfertasClientes");

            builder.Property(e => e.NumeroOferta).HasColumnName("NumeroOferta");

            builder.Property(e => e.Pedido).HasColumnName("Pedido");

            builder.Property(e => e.CodigoCliente).HasColumnName("CodigoCliente");

            builder.Property(e => e.NombreCliente).HasColumnName("NombreCliente");

            builder.Property(e => e.Descripcion).HasColumnName("Descripcion");

            builder.Property(e => e.FechaInicio).HasColumnName("FechaInicio");

            builder.Property(e => e.FechaFinalizacion).HasColumnName("FechaFinalizacion");

            builder.Property(e => e.Contacto1).HasColumnName("Contacto1");

            builder.Property(e => e.Contacto2).HasColumnName("Contacto2");

            builder.Property(e => e.Contacto3).HasColumnName("Contacto3");

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

        }
    }
}
