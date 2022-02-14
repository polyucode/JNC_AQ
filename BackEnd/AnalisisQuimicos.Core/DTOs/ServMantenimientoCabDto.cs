using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class ServMantenimientoCabDto
    {
        public int? id { get; set; }
        public int? IdCliente { get; set; }
        public int? IdTecnicoAsignado { get; set; }
        public int? IdElementoPlanta { get; set; }
        public string NumOferta { get; set; }
        public int? Tipo { get; set; }

        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }

    }
}
