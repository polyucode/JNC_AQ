using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public class PlantasAnalisis : BaseEntity
    {
        public int? CodigoCliente { get; set; }
        public int? Oferta { get; set; }
        public int? Id_Planta { get; set; }
        public int? Nivel { get; set; }
        public string Elemento { get; set; }
        public bool? Visible { get; set; }
        public string Conecta { get; set; }

        public int[] Analisis { get; set; }
    }
}
