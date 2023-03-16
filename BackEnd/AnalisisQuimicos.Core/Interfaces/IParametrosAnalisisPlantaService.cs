using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.QueryFilters;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IParametrosAnalisisPlantaService
    {
        IEnumerable<ParametrosAnalisisPlanta> GetAll();

        Task<ParametrosAnalisisPlanta> GetById(int id);

        Task Add(ParametrosAnalisisPlanta entity);

        void Update(ParametrosAnalisisPlanta entity);

        Task Delete(int id);

        IEnumerable<ParametrosAnalisisPlanta> GetAnalisis(ParametrosAnalisisQueryFilter codigo);
    }
}
