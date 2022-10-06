using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class AnalisisNivelesPlantasClienteConfiguration : IEntityTypeConfiguration<AnalisisNivelesPlantasCliente>
    {
        public void Configure(EntityTypeBuilder<AnalisisNivelesPlantasCliente> builder)
        {
            builder.HasKey(e => e.Id);

            builder.ToTable("GES_Conf_Analisis_NivelesPlantasCliente");

            builder.Property(e => e.CodigoCliente).HasColumnName("CodigoCliente");

            builder.Property(e => e.Oferta).HasColumnName("Oferta");

            builder.Property(e => e.Elemento).HasColumnName("Elemento");

            builder.Property(e => e.IdPlanta).HasColumnName("Id_Planta");

            builder.Property(e => e.Analisis).HasColumnName("Analisis");

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");
        }


    }
}
