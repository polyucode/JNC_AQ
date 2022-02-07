using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ServMantenimientoDetConfiguration : IEntityTypeConfiguration<ServMantenimientoDet>
    {
        public void Configure(EntityTypeBuilder<ServMantenimientoDet> builder)
        {

            builder.ToTable("GES_ServMantenimiento_Det");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.Estado).HasMaxLength(50);

            builder.Property(e => e.FechaPrevista).HasColumnType("datetime");

            builder.Property(e => e.FechaRealizacion).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.Observaciones).HasMaxLength(500);
        }
    }
}
