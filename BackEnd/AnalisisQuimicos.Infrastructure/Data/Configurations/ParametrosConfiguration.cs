using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ParametrosConfiguration : IEntityTypeConfiguration<Parametros>
    {
        public void Configure(EntityTypeBuilder<Parametros> builder)
        {
            builder.ToTable("LST_Parametros");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.Nombre).HasColumnName("Nombre");

            builder.Property(e => e.Unidad).HasColumnName("Unidad");

            builder.Property(e => e.Personalizado).HasColumnName("Personalizado");

        }
    }
}
