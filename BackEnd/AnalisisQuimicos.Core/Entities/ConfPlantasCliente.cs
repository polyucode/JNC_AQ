using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ConfPlantasCliente : BaseEntity
    {
        public int? CodigoCliente { get; set; }
        public string NombreCliente { get; set; }
        public int? Oferta { get; set; }
        public int? NumNiveles { get; set; }
        public string Diagrama { get; set; }
    }
}
