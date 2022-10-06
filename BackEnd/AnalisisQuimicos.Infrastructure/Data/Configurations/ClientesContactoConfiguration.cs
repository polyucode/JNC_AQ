using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ClientesContactoConfiguration : IEntityTypeConfiguration<ClientesContactos>
    {
        public void Configure(EntityTypeBuilder<ClientesContactos> builder)
        {
            builder.HasKey(e => e.Id);

            builder.ToTable("GES_ClientesContactos");

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

        }
    }
}
