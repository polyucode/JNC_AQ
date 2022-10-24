using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.QueryFilters;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IAnalisisNivelesPlantasClienteService
    {
        IEnumerable<AnalisisNivelesPlantasCliente> GetAll();

        Task<AnalisisNivelesPlantasCliente> GetById(int id);

        Task Add(AnalisisNivelesPlantasCliente entity);

        void Update(AnalisisNivelesPlantasCliente entity);

        Task Delete(int id);

        IEnumerable<AnalisisNivelesPlantasCliente> GetByNivelesPlanta(AnalisisNivelesPlantasClienteQueryFilter filtro);
    }
}
