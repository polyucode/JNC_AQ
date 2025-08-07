using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class CorreosConfiguration : IEntityTypeConfiguration<Correos>
    {
        public void Configure(EntityTypeBuilder<Correos> builder)
        {

            builder.ToTable("SYS_Correos");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.Username).HasMaxLength(50);
            builder.Property(e => e.Password).HasMaxLength(50);
        }
    }
}
