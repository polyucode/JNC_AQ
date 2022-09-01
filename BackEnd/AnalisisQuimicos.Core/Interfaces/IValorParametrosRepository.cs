using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.QueryFilters;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IValorParametrosRepository : IRepository<ValorParametros>
    {
        Task<ValorParametros> GetParameters(ValorParametrosQueryFilter filtro);
    }
}
