using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class ConsumoArticulosDTO
    {
        public string CodigoCliente { get; set; }
        public int? NumeroOferta { get; set; }
        public int? NumeroArticulo { get; set; }
        public int? Cantidad { get; set; }
        public int? IdCliente { get; set; }
        public int? IdOferta { get; set; }
        public int? IdArticulo { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
