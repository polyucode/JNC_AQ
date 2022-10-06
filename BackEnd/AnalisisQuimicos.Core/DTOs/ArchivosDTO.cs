using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class ArchivosDTO
    {
        public int? Id { get; set; }
        public string Nombre { get; set; }
        public string Extension { get; set; }
        public double Tamaño { get; set; }
        public string Ubicacion { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
