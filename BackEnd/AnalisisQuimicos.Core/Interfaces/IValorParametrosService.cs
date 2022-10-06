using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.QueryFilters;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IValorParametrosService
    {
        IEnumerable<ValorParametros> GetAll();

        Task<ValorParametros> GetById(int id);

        Task Add(ValorParametros entity);

        void Update(ValorParametros entity);

        Task Delete(int id);

        Task<ValorParametros> GetParameters(ValorParametrosQueryFilter filtro);
    }
}
