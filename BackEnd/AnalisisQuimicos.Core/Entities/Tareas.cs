using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Tareas : BaseEntity
    {
        public int? CodigoCliente { get; set; }
        public string NombreCliente { get; set; }
        public int? Oferta { get; set; }
        public int? Pedido { get; set; }
        public int? Operario { get; set; }
        public string Protocolo { get; set; }
        public int Elemento { get; set; }
        public int Analisis { get; set; }
        public DateTime? Fecha { get; set; }
        public int? Tipo { get; set; }

    }
}
