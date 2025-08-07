using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ObservacionesElementosConfiguration : IEntityTypeConfiguration<ObservacionesElementos>
    {
        public void Configure(EntityTypeBuilder<ObservacionesElementos> builder)
        {
            builder.HasKey(e => e.Id);

            builder.ToTable("GES_ObservacionesElementos");

            builder.Property(e => e.IdElemento).HasColumnName("IdElemento");
            builder.Property(e => e.Observacion).HasColumnName("Observacion");
            builder.Property(e => e.NombreUsuario).HasColumnName("NombreUsuario");
            builder.Property(e => e.ApellidosUsuario).HasColumnName("ApellidosUsuario");
            builder.Property(e => e.Fecha).HasColumnName("Fecha");
            builder.Property(e => e.VerCliente).HasColumnName("VerCliente");
            builder.Property(e => e.VerInsp).HasColumnName("VerInsp");
            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");


        }
    }
}
