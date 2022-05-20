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
            builder.HasNoKey();

            builder.ToTable("GES_Conf_Analisis_NivelesPlantasCliente");

            builder.Property(e => e.IdCliente).HasColumnName("Id_Cliente");

            builder.Property(e => e.IdElemento).HasColumnName("Id_Elemento");

            builder.Property(e => e.IdPlanta).HasColumnName("Id_Planta");

            builder.Property(e => e.Prop_FisicoQuimico).HasColumnName("Prop_FisicoQuimico");

            builder.Property(e => e.Prop_Aerobios).HasColumnName("Prop_Aerobios");

            builder.Property(e => e.Prop_Legionela).HasColumnName("Prop_Legionela");

            builder.Property(e => e.Prop_AguaPotable).HasColumnName("Prop_AguaPotable");

            builder.Property(e => e.Prop_AguasResiduales).HasColumnName("Prop_AguasResiduales");

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");
        }


    }
}
