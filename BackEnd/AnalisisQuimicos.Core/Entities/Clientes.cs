﻿using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Clientes : BaseEntity
    {
        public int? Codigo { get; set; }
        public string Cif { get; set; }
        public string RazonSocial { get; set; }
        public string Telefono { get; set; }
        public int? IdSector { get; set; }
        public string Movil { get; set; }
        public string Email { get; set; }
        public string Direccion { get; set; }
        public string Poblacion { get; set; }
        public string Provincia { get; set; }
        public string Cp { get; set; }
        public string Pais { get; set; }
        public string Comarca { get; set; }
        public int? IdFormaPago { get; set; }
        public string CuentaContable { get; set; }
        public bool? EsCreditoConcedido { get; set; }
        public decimal? CreditoConcedido { get; set; }
        public DateTime? FormalizacionCredito { get; set; }
        public bool? EnCaptacion { get; set; }
        public bool? HaComprado { get; set; }
        public bool? InstaladorOingenieria { get; set; }
        public string Observaciones { get; set; }
        public string Email2 { get; set; }
        public int? DiaCobro1 { get; set; }
        public int? DiaCobro2 { get; set; }
        public int? DiaCobro3 { get; set; }
        public int? MesNocobro { get; set; }
        public string Iban { get; set; }
        public bool? AlbaranesValorados { get; set; }
    }
}
