using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Consumos : BaseEntity
    {
        public int? Oferta { get; set; }
        public DateTime? Fecha { get; set; }
        public string Producto { get; set; }
        public int? Cantidad { get; set; }
        public string NombreProveedor { get; set; }
        public string ModoEnvio { get; set; }
        public int? NumAlbaran { get; set; }
    }
}
