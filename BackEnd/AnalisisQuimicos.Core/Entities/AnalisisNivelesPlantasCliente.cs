using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class AnalisisNivelesPlantasCliente : BaseEntity
    {
        public int? IdCliente { get; set; }
        public int? IdPlanta { get; set; }
        public int? IdElemento { get; set; }
        public bool? Prop_FisicoQuimico { get; set; }
        public bool? Prop_Aerobios { get; set; }
        public bool? Prop_Legionela { get; set; }
        public bool? Prop_AguaPotable { get; set; }
        public bool? Prop_AguasResiduales { get; set; }
    }
}
