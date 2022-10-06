using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Proveedores : BaseEntity
    {
        public int? Codigo { get; set; }
        public string Nombre { get; set; }
    }
}
