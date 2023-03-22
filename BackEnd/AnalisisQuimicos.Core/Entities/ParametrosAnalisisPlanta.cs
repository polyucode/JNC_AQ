using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ParametrosAnalisisPlanta : BaseEntity
    {
        public int? CodigoCliente { get; set; }
        public string NombreCliente { get; set; }
        public int? Oferta { get; set; }
        public int? Pedido { get; set; }
        public int? Elemento { get; set; }
        public string Periodo { get; set; }
        public int? Analisis { get; set; }
        public DateTime? Fecha { get; set; }
        public bool? Recogido { get; set; }
        public DateTime? FechaRecogido { get; set; }
        public bool? Realizado { get; set; }
        public DateTime? FechaRealizado { get; set; }
        public string Operario { get; set; }
        public string Protocolo { get; set; }
        public string Observaciones { get; set; }
        public bool? Facturado { get; set; }
        public string NumeroFacturado { get; set; }
        public string Resultado { get; set; }
        public int? Pdf { get; set; }
        public bool? Cancelado { get; set; }
        public string Comentarios { get; set; }
    }
}
