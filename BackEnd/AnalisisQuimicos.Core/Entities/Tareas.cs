using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Tareas : BaseEntity
    {
        public int? CodigoCliente { get; set; }
        public string NombreCliente { get; set; }
        public string Operario { get; set; }
        public string Protocolo { get; set; }
        public int? IdElementoPlanta { get; set; }
        public int? IdAnalisis { get; set; }
        public int? Oferta { get; set; }
        public int? Tipo { get; set; }

    }
}
