using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ConfPlantasCliente : BaseEntity
    {
        public int? CodigoCliente { get; set; }
        public string NombrePlanta { get; set; }
        public int? NumNiveles { get; set; }
    }
}
