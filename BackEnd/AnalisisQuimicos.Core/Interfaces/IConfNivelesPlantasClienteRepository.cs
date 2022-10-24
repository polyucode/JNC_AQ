using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.QueryFilters;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IConfNivelesPlantasClienteRepository : IRepository<ConfNivelesPlantasCliente>
    {
        IEnumerable<ConfNivelesPlantasCliente> GetByPlanta(ConfNivelesPlantasClienteQueryFilter filtro);
    }
}
