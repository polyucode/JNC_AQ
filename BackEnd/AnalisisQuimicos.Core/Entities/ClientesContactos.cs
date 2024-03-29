﻿using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ClientesContactos : BaseEntity
    {
            public int? CodigoCliente { get; set; }
            public string Nombre { get; set; }
            public string Telefono { get; set; }
            public string Email { get; set; }
            public string Cargo { get; set; }
            public string Comentarios { get; set; }
            public bool? Correo { get; set; }
    }
}
