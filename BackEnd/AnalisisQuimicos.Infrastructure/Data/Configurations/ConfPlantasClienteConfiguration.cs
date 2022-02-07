using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ConfPlantasClienteConfiguration : IEntityTypeConfiguration<ConfPlantasCliente>
    {
        public void Configure(EntityTypeBuilder<ConfPlantasCliente> builder)
        {
            builder.HasNoKey();

            builder.ToTable("GES_Conf_PlantasCliente");

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.IdCliente).HasColumnName("Id_Cliente");

            builder.Property(e => e.IdPlanta).HasColumnName("Id_Planta");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.NumNiveles).HasColumnName("Num_Niveles");
        }
    }
}
