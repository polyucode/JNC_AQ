using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class FilesDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Format { get; set; }
        public string Path { get; set; }
        public int? idTareaAnalisis { get; set; }
        public int? idComentario { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
