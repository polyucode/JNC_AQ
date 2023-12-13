using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Productos : BaseEntity
    {
        public string CodigoProducto { get; set; }
        public string Descripcion { get; set; }
        public int? Kg { get; set; }
    }
}
