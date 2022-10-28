using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.QueryFilters;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IConfPlantasClienteService
    {
        IEnumerable<ConfPlantasCliente> GetAll();

        Task<ConfPlantasCliente> GetById(int id);

        Task Add(ConfPlantasCliente entity);

        void Update(ConfPlantasCliente entity);

        Task Delete(int id);

        Task<ConfPlantasCliente> GetByClient(ConfPlantasClienteQueryFilter filtro);
    }
}
