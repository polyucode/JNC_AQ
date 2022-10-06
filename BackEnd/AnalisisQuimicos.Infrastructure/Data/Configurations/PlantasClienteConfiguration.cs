using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class PlantasClienteConfiguration : IEntityTypeConfiguration<PlantasCliente>
    {
        public void Configure(EntityTypeBuilder<PlantasCliente> builder)
        {
            builder.HasNoKey();

            builder.ToTable("GES_PlantasCliente");

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.Nombre).HasMaxLength(50);
        }
    }
}
