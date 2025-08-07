using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class OfertasProductosDTO
    {
        public int Id { set; get; }
        public int IdOferta { set; get; }
        public int IdProducto { set; get; }
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
