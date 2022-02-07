using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class NivelesPlantasCliente
    {
        public int? IdCliente { get; set; }
        public int? IdPlanta { get; set; }
        public int? Nivel { get; set; }
        public int? IdElemento { get; set; }
        public int? Orden { get; set; }
        public bool? Visible { get; set; }
        public string Conecta { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
