using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public class Parametros : BaseEntity
    {
        public string Nombre { get; set; }
        public string Unidad { get; set; }
    }
}
