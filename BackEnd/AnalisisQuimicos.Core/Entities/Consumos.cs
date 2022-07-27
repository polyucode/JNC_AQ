using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Consumos : BaseEntity
    {
        public int? CodigoCliente { get; set; }
        public int? Oferta { get; set; }
        public string Producto { get; set; }
        public string DescripcionProducto { get; set; }
        public int? Cantidad { get; set; }
        public int? Precio { get; set; }
        public int? StockMin { get; set; }
        public int? StockMax { get; set; }
        public int? Consumidos { get; set; }
        public int? Entregar { get; set; }
        public string ADR { get; set; }
        public int? Portes { get; set; }
    }
}
