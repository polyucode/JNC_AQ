using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ProvinciasConfiguration : IEntityTypeConfiguration<Provincias>
    {
        public void Configure(EntityTypeBuilder<Provincias> builder)
        {
            builder.HasNoKey();

            builder.ToTable("LST_Provincias");

            builder.Property(e => e.Codigo).HasMaxLength(20);

            builder.Property(e => e.Descripcion).HasMaxLength(500);
        }
    }
}
