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
        public string Elemento { get; set; }
        public string Parametro { get; set; }
        public DateTime? Fecha { get; set; }
        public int? Valor { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
