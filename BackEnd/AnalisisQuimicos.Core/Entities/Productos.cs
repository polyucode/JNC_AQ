using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Productos : BaseEntity
    {
        public int? CodigoProducto { get; set; }
        public string Descripcion { get; set; }
    }
}
