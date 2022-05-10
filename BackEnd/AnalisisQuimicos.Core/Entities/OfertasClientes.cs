using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class OfertasClientes : BaseEntity
    {
        public int? Id { get; set; }
        public int? IdCliente { get; set; }
        public int? Numero { get; set; }
        public string Articulo { get; set; }
        public int? Cantidad { get; set; }
        public decimal Precio { get; set; }
        public int? StockMin { get; set; }
        public int? StockMax { get; set; }
        public int? Consumidos { get; set; }
        public int? FaltanEntregar { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFinalizacion { get; set; }
    }
}
