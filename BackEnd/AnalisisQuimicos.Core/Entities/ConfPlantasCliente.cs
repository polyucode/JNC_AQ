using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ConfPlantasCliente : BaseEntity
    {
        public int? IdCliente { get; set; }
        public int? IdPlanta { get; set; }
        public int? NumNiveles { get; set; }
    }
}
