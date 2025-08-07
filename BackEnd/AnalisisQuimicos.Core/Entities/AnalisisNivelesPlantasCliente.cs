using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class AnalisisNivelesPlantasCliente : BaseEntity
    {
        public int Id_NivelesPlanta { get; set; }
        public int Id_Analisis { get; set; }

    }
}
