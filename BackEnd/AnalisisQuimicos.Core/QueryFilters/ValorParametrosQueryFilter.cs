using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.QueryFilters
{
    public class ValorParametrosQueryFilter
    {
        public int? CodigoCliente { get; set; }

        public int? Oferta { get; set; }

        public int? Id_Elemento { get; set; }
    }
}