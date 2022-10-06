using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class ServMantenimientoDetDto
    {

        public int id { get; set; }
        public int? IdCab { get; set; }
        public DateTime? FechaPrevista { get; set; }
        public bool? Realizado { get; set; }
        public DateTime? FechaRealizacion { get; set; }
        public string Estado { get; set; }
        public string Observaciones { get; set; }

    }
}
