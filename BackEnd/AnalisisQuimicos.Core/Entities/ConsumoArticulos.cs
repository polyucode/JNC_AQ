using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ConsumoArticulos : BaseEntity
    {
        public string CodigoCliente { get; set; }
        public int? NumeroOferta { get; set; }
        public int? NumeroArticulo { get; set; }
        public int? Cantidad { get; set; }
        public int? IdCliente { get; set; }
        public int? IdOferta { get; set; }
        public int? IdArticulo { get; set; }
    }
}
