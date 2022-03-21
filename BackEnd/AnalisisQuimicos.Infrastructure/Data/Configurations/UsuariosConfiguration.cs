using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class UsuariosConfiguration : IEntityTypeConfiguration<Usuarios>
    {
        public void Configure(EntityTypeBuilder<Usuarios> builder)
        {
            

            builder.ToTable("SYS_Usuarios");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.Apellidos).HasMaxLength(250);

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.Firma).HasMaxLength(2000);

            builder.Property(e => e.Login).HasMaxLength(50);

            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.Nombre).HasMaxLength(50);

            builder.Property(e => e.Password).HasMaxLength(150);

            builder.Property(e => e.Telefono).HasMaxLength(250);

            builder.Property(e => e.Usuario).HasMaxLength(50);
        }
    }

}
