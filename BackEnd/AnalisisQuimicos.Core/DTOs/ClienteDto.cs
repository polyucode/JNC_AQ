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
        public int? Poblacion { get; set; }
        public int? Provincia { get; set; }
        public string Cp { get; set; }
        public string Pais { get; set; }
        public int? Comarca { get; set; }
        public string CuentaContable { get; set; }
    }
}
