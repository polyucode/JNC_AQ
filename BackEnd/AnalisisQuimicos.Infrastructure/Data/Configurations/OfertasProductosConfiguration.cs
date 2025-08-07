using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class OfertasProductosConfiguration : IEntityTypeConfiguration<OfertasProductos>
    {
        public void Configure(EntityTypeBuilder<OfertasProductos> builder)
        {
            builder.HasKey(e => e.Id);

            builder.ToTable("GES_OfertasProductos");

            builder.Property(e => e.IdOferta).HasColumnName("IdOferta");
            builder.Property(e => e.IdProducto).HasColumnName("IdProducto");
            builder.Property(e => e.Unidades).HasColumnName("Unidades");
            builder.Property(e => e.Precio).HasColumnName("Precio");
            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");


        }
    }
}
