using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ConfNivelesPlantasCliente : BaseEntity
    {
        public int? Id_Cliente { get; set; }
        public int? Id_Planta { get; set; }
        public int? Nivel { get; set; }
        public int? Id_Elemento { get; set; }
        public int? Orden { get; set; }
        public bool? Visible { get; set; }
        public string Conecta { get; set; }
    }
}
