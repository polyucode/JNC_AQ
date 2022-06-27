using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class UsuarioDto
    {

        public int? Id { get; set; }
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
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
