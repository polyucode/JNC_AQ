using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class ValorParametrosDTO
    {
        public int? Id { get; set; }
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
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
