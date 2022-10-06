using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class PoblacionesConfiguration : IEntityTypeConfiguration<Poblaciones>
    {
        public void Configure(EntityTypeBuilder<Poblaciones> builder)
        {
            builder.HasNoKey();

            builder.ToTable("LST_Poblaciones");

            builder.Property(e => e.Cp)
                .HasColumnName("CP")
                .HasMaxLength(20);

            builder.Property(e => e.AddDate).HasColumnType("datetime");
            builder.Property(e => e.DelDate).HasColumnType("datetime");
            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.Poblacion).HasMaxLength(500);
        }
    }
}
