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
        public string Descripcion { get; set; }
        public int? Cantidad { get; set; }
        public decimal Precio { get; set; }
        public int? StockMin { get; set; }
        public int? StockMax { get; set; }
        public int? Consumidos { get; set; }
        public int? FaltaEntregar { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFinalizacion { get; set; }
    }
}
