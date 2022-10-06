using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ComarcasConfiguration : IEntityTypeConfiguration<Comarcas>
    {
        public void Configure(EntityTypeBuilder<Comarcas> builder)
        {
            builder.HasNoKey();

            builder.ToTable("LST_Comarcas");

            builder.Property(e => e.AddDate).HasColumnType("datetime");
            builder.Property(e => e.DelDate).HasColumnType("datetime");
            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.Descripcion).HasMaxLength(500);
        }
    }
}
