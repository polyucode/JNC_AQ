using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class ServMantenimientoCabDto
    {
        public int id { get; set; }
        public int? IdCliente { get; set; }
        public int? IdTecnicoAsignado { get; set; }
        public int? IdElementoPlanta { get; set; }
        public string NumOferta { get; set; }
        public string Tipo { get; set; }

    }
}
