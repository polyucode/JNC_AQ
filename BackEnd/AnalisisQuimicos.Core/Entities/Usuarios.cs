using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Usuarios : BaseEntity
    {
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Login { get; set; }
        public string Telefono { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }
        public bool? Activo { get; set; }
        public string Firma { get; set; }
        public int? IdCliente { get; set; }
        public int? IdPerfil { get; set; }
        public int? CodigoOperario { get; set; }

    }
}
