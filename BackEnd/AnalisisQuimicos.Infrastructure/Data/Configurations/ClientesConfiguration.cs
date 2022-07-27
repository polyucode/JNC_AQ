using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ClientesConfiguration : IEntityTypeConfiguration<Clientes>
    {
        public void Configure(EntityTypeBuilder<Clientes> builder)
        {

            builder.ToTable("GES_Clientes");

            builder.HasKey(e => e.Id);


            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.Cif)
                        .HasColumnName("CIF")
                        .HasMaxLength(50);

            builder.Property(e => e.Codigo).HasMaxLength(100);

            builder.Property(e => e.Comarca).HasMaxLength(250);

            builder.Property(e => e.Cp)
                        .HasColumnName("CP")
                        .HasMaxLength(20);

            builder.Property(e => e.CreditoConcedido).HasColumnType("decimal(18, 2)");

            builder.Property(e => e.CuentaContable).HasMaxLength(150);

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.Direccion).HasMaxLength(500);

            builder.Property(e => e.Email).HasMaxLength(150);

            builder.Property(e => e.Email2).HasMaxLength(500);

            builder.Property(e => e.FormalizacionCredito).HasColumnType("date");

            builder.Property(e => e.Iban)
                        .HasColumnName("IBAN")
                        .HasMaxLength(500);

            builder.Property(e => e.InstaladorOingenieria).HasColumnName("InstaladorOIngenieria");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.Movil).HasMaxLength(20);

            builder.Property(e => e.Pais).HasMaxLength(100);

            builder.Property(e => e.Poblacion).HasMaxLength(200);

            builder.Property(e => e.Provincia).HasMaxLength(200);

            builder.Property(e => e.RazonSocial).HasMaxLength(500);

            builder.Property(e => e.Telefono).HasMaxLength(20);
        }
    }
}
