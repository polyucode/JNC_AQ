using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class TareaArchivosConfiguration : IEntityTypeConfiguration<TareaArchivos>
    {
        public void Configure(EntityTypeBuilder<TareaArchivos> builder)
        {
            builder.HasKey(e => e.Id);

            builder.ToTable("GES_TareaArchivos");

            builder.Property(e => e.IdTarea).HasColumnName("IdTarea");
            builder.Property(e => e.IdFile).HasColumnName("IdFile");
            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");


        }
    }
}
