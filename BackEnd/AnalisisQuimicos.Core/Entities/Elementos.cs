using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Elementos : BaseEntity
    {
        public string Nombre { get; set; }        
        public string NombreIcono { get; set; }
    }
}
