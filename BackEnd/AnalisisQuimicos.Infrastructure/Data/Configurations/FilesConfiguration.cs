using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class FilesConfiguration : IEntityTypeConfiguration<Files>
    {
        public void Configure(EntityTypeBuilder<Files> builder)
        {
            builder.HasKey(e => e.Id);

            builder.ToTable("GES_Files");

            builder.Property(e => e.Name).HasMaxLength(300);
            builder.Property(e => e.Format).HasMaxLength(50);
            builder.Property(e => e.Path);
        }
    }
}
