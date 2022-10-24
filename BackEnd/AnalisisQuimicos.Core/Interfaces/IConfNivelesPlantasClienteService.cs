using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.QueryFilters;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IConfNivelesPlantasClienteService
    {
        IEnumerable<ConfNivelesPlantasCliente> GetAll();

        Task<ConfNivelesPlantasCliente> GetById(int id);

        Task Add(ConfNivelesPlantasCliente entity);

        void Update(ConfNivelesPlantasCliente entity);

        Task Delete(int id);

        IEnumerable<ConfNivelesPlantasCliente> GetByPlanta(ConfNivelesPlantasClienteQueryFilter filtro);
    }
}
