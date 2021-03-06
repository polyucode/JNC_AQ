using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class AnalisisNivelesPlantasClienteDTO
    {
        public int? IdCliente { get; set; }
        public int? IdPlanta { get; set; }
        public int? IdElemento { get; set; }
        public int? IdAnalisis { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
