using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public class ObservacionesElementos:BaseEntity
    {
        public int IdElemento { get; set; }
        public string Observacion { get; set; }
        public string NombreUsuario { get; set; }
        public string ApellidosUsuario { get; set; }
        public DateTime? Fecha { get; set; }
        public bool? VerCliente { get; set; }
        public bool? VerInsp { get; set; }
    }
}
