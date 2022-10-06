using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class AnalisisConfiguration : IEntityTypeConfiguration<Analisis>
    {
        public void Configure(EntityTypeBuilder<Analisis> builder)
        {
            builder.HasKey(e => e.Id);

            builder.ToTable("GES_Analisis");

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.Nombre).HasMaxLength(50);
        }


    }
}
