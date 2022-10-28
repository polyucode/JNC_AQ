using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class ConfPlantasClienteDTO
    {
        public int? Id { get; set; }
        public int? CodigoCliente { get; set; }
        public string NombreCliente { get; set; }
        public string Diagrama { get; set; }
        public int? Oferta { get; set; }
        public int? NumNiveles { get; set; }
        public string Diagrama { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
