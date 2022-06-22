using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ServMantenimientoCab : BaseEntity
    {
        public int? IdCliente { get; set; }
        public string NombreCliente { get; set; }
        public int? IdTecnicoAsignado { get; set; }
        public int? IdElementoPlanta { get; set; }
        public int? IdAnalisis { get; set; }
        public int? Oferta { get; set; }
        public int? Tipo { get; set; }

    }
}
