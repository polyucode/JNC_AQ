using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ValorParametros: BaseEntity
    {
        public int? CodigoCliente { get; set; }
        public string Referencia { get; set; }
        public int? Oferta { get; set; }
        public string Elemento { get; set; }
        public string Parametro { get; set; }
        public DateTime? Fecha { get; set; }
        public int? Valor { get; set; }
    }
}
