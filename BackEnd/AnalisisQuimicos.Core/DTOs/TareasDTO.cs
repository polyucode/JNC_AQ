using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class TareasDTO
    {
        public int? Id { get; set; }
        public int? CodigoCliente { get; set; }
        public string NombreCliente { get; set; }
        public string Operario { get; set; }
        public string Protocolo { get; set; }
        public int? IdElementoPlanta { get; set; }
        public int? IdAnalisis { get; set; }
        public int? Oferta { get; set; }
        public int? Tipo { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }

    }
}
