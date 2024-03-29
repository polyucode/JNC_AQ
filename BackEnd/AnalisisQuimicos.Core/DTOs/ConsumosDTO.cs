﻿using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class ConsumosDTO
    {
        public int? Id { get; set; }
        public int? Oferta { get; set; }
        public DateTime? Fecha { get; set; }
        public string Producto { get; set; }
        public int? Cantidad { get; set; }
        public string NombreProveedor { get; set; }
        public string ModoEnvio { get; set; }
        public int? NumAlbaran { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
