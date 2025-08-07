using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public class TareaArchivos : BaseEntity
    {
        public int IdTarea { get; set; }
        public int IdFile { get; set; }
    }
}
