using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Consumos : BaseEntity
    {
        public int? Oferta { get; set; }
        public DateTime? Fecha { get; set; }
        public string Producto { get; set; }
        public int? Cantidad { get; set; }
        public int? Albaran { get; set; }
        public int? ModoEnvio { get; set; }
        public string Observaciones { get; set; }

    }
}