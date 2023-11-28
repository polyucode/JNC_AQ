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
        public int? Id_Elemento { get; set; }
        public int? Id_Analisis { get; set; }
        public int? Id_Operario { get; set; }
        public int? Parametro { get; set; }
        public DateTime? Fecha { get; set; }
        public string Valor { get; set; }
        public string Unidad { get; set; }
        public string Metodo { get; set; }
    }
}
