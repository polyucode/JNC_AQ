using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ServMantenimientoCab : BaseEntity
    {

        public int? IdCliente { get; set; }
        public int? IdTecnicoAsignado { get; set; }
        public int? IdElementoPlanta { get; set; }
        public string NumOferta { get; set; }
        public string Tipo { get; set; }

    }
}
