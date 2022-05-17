using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class OfertasClientesDTO
    {
        public int? Id { get; set; }
        public int? NumeroOferta { get; set; }
        public int? CodigoCliente { get; set; }
        public string Descripcion { get; set; }
        public int? Cantidad { get; set; }
        public decimal Precio { get; set; }
        public int? StockMin { get; set; }
        public int? StockMax { get; set; }
        public int? Consumidos { get; set; }
        public int? FaltaEntregar { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFinalizacion { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
