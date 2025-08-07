using System;
using System.Collections.Generic;
using System.Text;
using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class OfertasContactosConfiguration : IEntityTypeConfiguration<OfertasContactos>
    {
        public void Configure(EntityTypeBuilder<OfertasContactos> builder)
        {
            builder.HasKey(e => e.Id);

            builder.ToTable("GES_OfertasContactos");

            builder.Property(e => e.IdOferta).HasColumnName("IdOferta");
            builder.Property(e => e.IdContacto).HasColumnName("IdContacto");
            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");


        }
    }
}
