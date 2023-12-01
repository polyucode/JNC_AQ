using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class OfertasClientesDTO
    {
        public int? Id { get; set; }
        public int? NumeroOferta { get; set; }
        public int? Pedido { get; set; }
        public string Referencia { get; set; }
        public int? CodigoCliente { get; set; }
        public string NombreCliente { get; set; }
        public string Descripcion { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFinalizacion { get; set; }
        public string Contacto1 { get; set; }
        public string Contacto2 { get; set; }
        public string Contacto3 { get; set; }
        public int? Producto { get; set; }
        public int? Unidades { get; set; }
        public decimal Precio { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
