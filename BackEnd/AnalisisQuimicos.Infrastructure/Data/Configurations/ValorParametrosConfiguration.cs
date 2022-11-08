using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ValorParametrosConfiguration : IEntityTypeConfiguration<ValorParametros>
    {
        public void Configure(EntityTypeBuilder<ValorParametros> builder)
        {

            builder.ToTable("GES_ValorParametros");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.CodigoCliente).HasColumnType("CodigoCliente");

            builder.Property(e => e.Referencia).HasColumnType("Referencia");

            builder.Property(e => e.Oferta).HasColumnType("Oferta");

            builder.Property(e => e.Id_Elemento).HasColumnType("IdElemento");

            builder.Property(e => e.Parametro).HasColumnType("Parametro");

            builder.Property(e => e.Fecha).HasColumnType("Fecha");

            builder.Property(e => e.Valor).HasColumnType("Valor");

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

        }
    }
}
