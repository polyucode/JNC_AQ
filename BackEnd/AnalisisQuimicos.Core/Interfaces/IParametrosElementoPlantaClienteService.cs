using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.QueryFilters;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IParametrosElementoPlantaClienteService
    {
        IEnumerable<ParametrosElementoPlantaCliente> GetAll();

        Task<ParametrosElementoPlantaCliente> GetById(int id);

        Task Add(ParametrosElementoPlantaCliente entity);

        void Update(ParametrosElementoPlantaCliente entity);

        Task Delete(int id);

        Task<ParametrosElementoPlantaCliente> GetParameters(ParametrosElementoQueryFilter filtro);
    }
}
