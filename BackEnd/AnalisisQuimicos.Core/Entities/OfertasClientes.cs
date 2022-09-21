using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class OfertasClientes : BaseEntity
    {
        public int? NumeroOferta { get; set; }
        public int? Pedido { get; set; }
        public int? CodigoCliente { get; set; }
        public string NombreCliente { get; set; }
        public string Descripcion { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFinalizacion { get; set; }
        public string Contacto1 { get; set; }
        public string Contacto2 { get; set; }
        public string Contacto3 { get; set; }

    }
}
