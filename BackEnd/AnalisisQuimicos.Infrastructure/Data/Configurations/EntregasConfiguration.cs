using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class EntregasConfiguration : IEntityTypeConfiguration<Entregas>
    {
        public void Configure(EntityTypeBuilder<Entregas> builder)
        {

            builder.ToTable("GES_Entregas");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

        }
    }
}