using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class HistorialCorreosEnviadosConfiguration : IEntityTypeConfiguration<HistorialCorreosEnviados>
    {
        public void Configure(EntityTypeBuilder<HistorialCorreosEnviados> builder)
        {

            builder.ToTable("GES_HistorialCorreosEnviados");

            builder.HasKey(e => e.Id);

            //builder.Property(e => e.Nombre).HasMaxLength(100);

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

        }
    }
}
