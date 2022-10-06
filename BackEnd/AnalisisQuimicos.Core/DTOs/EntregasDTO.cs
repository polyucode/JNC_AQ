using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class EntregasDTO
    {
        public int? Id { get; set; }
        public int? CodigoCliente { get; set; }
        public string NombreCliente { get; set; }
        public int? Oferta { get; set; }
        public string Elemento { get; set; }
        public string Analisis { get; set; }
        public string Descripcion { get; set; }
        public DateTime? Fecha { get; set; }
        public bool? Entregado { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }

    }
}