using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public class Parametros : BaseEntity
    {
        public string Nombre { get; set; }
        public string Unidad { get; set; }
        public bool EsCalculado { get; set; }
        public string ParametrosCalculo { get; set; }
        public int IdParametroCalculado { get; set; }
    }
}
