using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class AnalisisNivelesPlantasCliente : BaseEntity
    {
        public int? CodigoCliente { get; set; }
        public int? Oferta { get; set; }
        public int? IdPlanta { get; set; }
        public string Elemento { get; set; }
        public string Analisis { get; set; }

    }
}
