using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ServMantenimientoDet : BaseEntity
    {
        public int? IdCab { get; set; }
        public DateTime? FechaPrevista { get; set; }
        public bool? Realizado { get; set; }
        public DateTime? FechaRealizacion { get; set; }
        public string Estado { get; set; }
        public string Observaciones { get; set; }

    }
}
