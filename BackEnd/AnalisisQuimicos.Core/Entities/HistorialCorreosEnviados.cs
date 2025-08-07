using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public class HistorialCorreosEnviados : BaseEntity
    {
        public int? CodigoCliente { get; set; }
        public int? IdElemento { get; set; }
        public string Email { get; set; }
        public DateTime Fecha{ get; set; }
        public string NombreContacto { get; set; }
    }
}
