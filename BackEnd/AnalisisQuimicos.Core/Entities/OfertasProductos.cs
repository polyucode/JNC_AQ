using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class OfertasProductos : BaseEntity
    {
        public int IdOferta { set; get; }
        public int IdProducto { set; get; }
        public int? Unidades { get; set; }
        public decimal Precio { get; set; }
    }
}
