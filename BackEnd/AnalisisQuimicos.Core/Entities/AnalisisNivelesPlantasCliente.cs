using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class AnalisisNivelesPlantasCliente : BaseEntity
    {
        public int? IdCliente { get; set; }
        public int? IdPlanta { get; set; }
        public int? IdElemento { get; set; }
        public int? IdAnalisis { get; set; }

    }
}
