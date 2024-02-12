using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.DTOs
{
    public class ClienteDto
    {
        public int? Id { get; set; }
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
        public string CuentaContable { get; set; }
        public DateTime? AddDate { get; set; }
        public int? AddIdUser { get; set; }
        public DateTime? ModDate { get; set; }
        public int? ModIdUser { get; set; }
        public DateTime? DelDate { get; set; }
        public int? DelIdUser { get; set; }
        public bool? Deleted { get; set; }
    }
}
