﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class ParametrosAnalisisPlantaDTO
    {
        public int? Id { get; set; }
        public int? CodigoCliente { get; set; }
        public string NombreCliente { get; set; }
        public int? Oferta { get; set; }
        public int? Pedido { get; set; }
        public string Elemento { get; set; }
        public string Periodo { get; set; }
        public string Analisis { get; set; }
        public string NombreAnalisis { get; set; }
        public DateTime? Fecha { get; set; }
        public bool? Realizado { get; set; }
        public string Operario { get; set; }
        public string Protocolo { get; set; }
        public string Observaciones { get; set; }
        public bool? Facturado { get; set; }
        public string NumeroFacturado { get; set; }
        public string Resultado { get; set; }
        public bool? Recogido { get; set; }
        public string Pdf { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
