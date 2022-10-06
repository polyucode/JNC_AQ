using System;
using System.Collections.Generic;
using System.Text;
using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ElementosPlantaConfiguration : IEntityTypeConfiguration<ElementosPlanta>
    {
        public void Configure(EntityTypeBuilder<ElementosPlanta> builder)
        {

            builder.ToTable("GES_ElementosPlanta");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.Nombre).HasMaxLength(50);
        }
    }
}
