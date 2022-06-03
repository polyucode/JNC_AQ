using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class ConfNivelesPlantasClienteDTO
    {
        public int? Id { get; set; }
        public int? CodigoCliente { get; set; }
        public int? Id_Planta { get; set; }
        public int? Nivel { get; set; }
        public int? Id_Elemento { get; set; }
        public bool? Visible { get; set; }
        public string Conecta { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
