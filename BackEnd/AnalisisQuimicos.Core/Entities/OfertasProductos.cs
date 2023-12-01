using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class OfertasProductos : BaseEntity
    {
        public int? CodigoCliente { get; set; }
        public int? Oferta { get; set; }
        public int? Producto { get; set; }
        public string DescripcionProducto { get; set; }
        public int? Cantidad { get; set; }
        public decimal Precio { get; set; }
        public int? StockMin { get; set; }
        public int? StockMax { get; set; }
        public int? Consumidos { get; set; }
        public int? Pendientes { get; set; }
        public string ADR { get; set; }
        public string Portes { get; set; }
    }
}
