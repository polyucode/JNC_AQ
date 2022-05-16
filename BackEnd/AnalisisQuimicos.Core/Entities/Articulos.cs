using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Articulos : BaseEntity
    {
        public string CodigoArticulo { get; set; }
        public string Nombre { get; set; }
        public int? Stock { get; set; }
    }
}
