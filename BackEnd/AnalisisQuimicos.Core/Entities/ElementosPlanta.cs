﻿using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ElementosPlanta : BaseEntity
    {
        public string Nombre { get; set; }
        public int? Numero { get; set; }
        public bool? Maestro { get; set; }

    }
}
