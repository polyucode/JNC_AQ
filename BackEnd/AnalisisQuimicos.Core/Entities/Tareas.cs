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
        public string Operario { get; set; }
        public string Protocolo { get; set; }
        public string ElementoPlanta { get; set; }
        public string Analisis { get; set; }
        public string Final { get; set; }
        public string Valor { get; set; }
        public string NombreValor { get; set; }
        public string Unidades { get; set; }
        public int? Tipo { get; set; }
        public bool? Cancelado { get; set; }
        public string Comentarios { get; set; }

    }
}
