using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ElementosConfiguration : IEntityTypeConfiguration<Elementos>
    {
        public void Configure(EntityTypeBuilder<Elementos> builder)
        {

            builder.ToTable("GES_Elementos");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Nombre).HasMaxLength(100);

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

        }
    }
}
