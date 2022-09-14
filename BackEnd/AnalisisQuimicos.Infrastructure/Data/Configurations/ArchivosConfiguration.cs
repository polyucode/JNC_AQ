using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ArchivosConfiguration : IEntityTypeConfiguration<Archivos>
    {
        public void Configure(EntityTypeBuilder<Archivos> builder)
        {
            builder.HasKey(e => e.Id);

            builder.ToTable("GES_Archivos");

        }


    }
}
