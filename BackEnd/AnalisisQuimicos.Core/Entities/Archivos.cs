using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Archivos : BaseEntity
    {
        public string Nombre { get; set; }
        public string Extension { get; set; }
        public double Tamaño { get; set; }
        public string Ubicacion { get; set; }
    }
}
