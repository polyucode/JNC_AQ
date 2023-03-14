using AnalisisQuimicos.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IClienteService
    {
        IEnumerable<Clientes> GetAll();

        Task<Clientes> GetById(int id);

        Task Add(Clientes entity);

        void Update(Clientes entity);

        Task Delete(int id);

        Task<Clientes> GetByCodigoCliente(int codigo);
    }
}
