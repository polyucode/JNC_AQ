using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ParametrosAnalisisPlanta : BaseEntity
    {
        public int? CodigoCliente { get; set; }
        public int? Oferta { get; set; }
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
    }
}
