using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ConfNivelesPlantasClienteConfiguration : IEntityTypeConfiguration<ConfNivelesPlantasCliente>
    {
        public void Configure(EntityTypeBuilder<ConfNivelesPlantasCliente> builder)
        {
            builder.HasKey(e => e.Id);

            builder.ToTable("GES_Conf_NivelesPlantasCliente");

            builder.Property(e => e.CodigoCliente).HasColumnName("CodigoCliente");

            builder.Property(e => e.Oferta).HasColumnName("Oferta");

            builder.Property(e => e.Id_Planta).HasColumnName("Id_Planta");

            builder.Property(e => e.Nivel).HasColumnName("Nivel");

            builder.Property(e => e.Elemento).HasColumnName("Elemento");

            builder.Property(e => e.Visible).HasColumnName("Visible");

            builder.Property(e => e.Conecta).HasColumnName("Conecta");

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datModDatetime");

            
        }
    }
}
