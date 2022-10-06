using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.QueryFilters
{
    public class UsuariosQueryFilter
    {
        public string Nombre { get; set; }

        public string Apellidos { get; set; }

        public int? IdPerfil { get; set; }

        public string Telefono { get; set; }
    }
}
