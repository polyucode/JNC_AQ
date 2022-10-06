using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ParametrosAnalisisPlantaConfiguration : IEntityTypeConfiguration<ParametrosAnalisisPlanta>
    {
        public void Configure(EntityTypeBuilder<ParametrosAnalisisPlanta> builder)
        {
            builder.HasKey(e => e.Id);

            builder.ToTable("GES_ParametrosAnalisisPlanta");

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

        }
    }
}
