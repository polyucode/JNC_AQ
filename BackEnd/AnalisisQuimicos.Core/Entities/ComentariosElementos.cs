using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public class ComentariosElementos:BaseEntity
    {
        public int IdElemento { get; set; }
        public int IdTarea { get; set; }
        public string Comentario { get; set; }
        public string NombreUsuario { get; set; }
        public string ApellidosUsuario { get; set; }
        public DateTime? Fecha { get; set; }
        public int IdAnalisis { get; set; }
        public string NombreAnalisis { get; set; }
    }
}
