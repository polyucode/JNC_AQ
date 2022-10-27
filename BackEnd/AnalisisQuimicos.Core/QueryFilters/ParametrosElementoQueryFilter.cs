using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.QueryFilters
{
    public class ParametrosElementoQueryFilter
    {
        public int? CodigoCliente { get; set; }

        public int? Oferta { get; set; }

        public string Elemento { get; set; }
        //public int? Id_Elemento { get; set; }
    }
}
