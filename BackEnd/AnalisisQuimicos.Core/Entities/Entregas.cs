using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Entregas : BaseEntity
    {
        public int? CodigoCliente { get; set; }
        public string NombreCliente { get; set; }
        public int? Oferta { get; set; }
        public string Elemento { get; set; }
        public string Analisis { get; set; }
        public string Descripcion { get; set; }
        public bool? Entregado { get; set; }

    }
}
