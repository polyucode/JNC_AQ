using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ComentariosElementosConfiguration : IEntityTypeConfiguration<ComentariosElementos>
    {
        public void Configure(EntityTypeBuilder<ComentariosElementos> builder)
        {
            builder.HasKey(e => e.Id);

            builder.ToTable("GES_ComentariosElementos");

            builder.Property(e => e.IdElemento).HasColumnName("IdElemento");
            builder.Property(e => e.IdTarea).HasColumnName("IdTarea");
            builder.Property(e => e.Comentario).HasColumnName("Comentario");
            builder.Property(e => e.NombreUsuario).HasColumnName("NombreUsuario");
            builder.Property(e => e.ApellidosUsuario).HasColumnName("ApellidosUsuario");
            builder.Property(e => e.Fecha).HasColumnName("Fecha");
            builder.Property(e => e.IdAnalisis).HasColumnName("IdAnalisis");
            builder.Property(e => e.NombreAnalisis).HasColumnName("NombreAnalisis");
            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");


        }
    }
}
