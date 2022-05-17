using System;
using System.Collections.Generic;
using System.Text;
using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class OfertasClientesConfiguration : IEntityTypeConfiguration<OfertasClientes>
    {
        public void Configure(EntityTypeBuilder<OfertasClientes> builder)
        {
            builder.HasKey(e => e.Id);

            builder.ToTable("GES_OfertasClientes");

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

        }
    }
}
