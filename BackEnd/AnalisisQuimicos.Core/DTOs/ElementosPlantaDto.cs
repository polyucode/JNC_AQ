using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class ElementosPlantaDto
    {
        public int? Id { get; set; }
        public string Nombre { get; set; }
        public int? Numero { get; set; }
        public string Descripcion { get; set; }
        public bool? VerInsp { get; set; }
        public bool? Maestro { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
