using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.QueryFilters;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IParametrosAnalisisPlantaRepository : IRepository<ParametrosAnalisisPlanta>
    {
        IEnumerable<ParametrosAnalisisPlanta> GetAnalisis(ParametrosAnalisisQueryFilter analisisFilter);
    }
}
