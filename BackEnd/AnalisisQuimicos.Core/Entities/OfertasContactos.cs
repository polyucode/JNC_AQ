using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class OfertasContactos : BaseEntity
    {
        public int IdOferta { set; get; }
        public int IdContacto { set; get; }
    }
}
