using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Poblaciones : BaseEntity 
    {
        public string Poblacion { get; set; }
        public string Cp { get; set; }
    }
}
