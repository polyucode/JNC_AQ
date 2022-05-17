using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Consumos : BaseEntity
    {
        public int? NumeroOferta { get; set; }
        public int? CodigoProducto { get; set; }
        public int? Consumo { get; set; }
    }
}
