using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ServMantenimientoCabConfiguration : IEntityTypeConfiguration<ServMantenimientoCab>
    {
        public void Configure(EntityTypeBuilder<ServMantenimientoCab> builder)
        {

            builder.ToTable("GES_ServMantenimiento_Cab");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.NumOferta).HasMaxLength(50);

        }
    }
}
