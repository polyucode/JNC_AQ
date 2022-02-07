using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class NivelesPlantasClienteConfiguration : IEntityTypeConfiguration<NivelesPlantasCliente>
    {
        public void Configure(EntityTypeBuilder<NivelesPlantasCliente> builder)
        {
            builder.HasNoKey();

            builder.ToTable("GES_Conf_NivelesPlantasCliente");

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.Conecta).HasMaxLength(20);

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.IdCliente).HasColumnName("Id_Cliente");

            builder.Property(e => e.IdElemento).HasColumnName("Id_Elemento");

            builder.Property(e => e.IdPlanta).HasColumnName("Id_Planta");

            builder.Property(e => e.ModDate).HasColumnType("datetime");
        }
    }
}
