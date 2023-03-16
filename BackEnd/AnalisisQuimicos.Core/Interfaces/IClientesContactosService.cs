using AnalisisQuimicos.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IClientesContactosService
    {
        IEnumerable<ClientesContactos> GetAll();

        Task<ClientesContactos> GetById(int id);

        Task Add(ClientesContactos entity);

        void Update(ClientesContactos entity);

        Task Delete(int id);

        IEnumerable<ClientesContactos> GetByCodigoCliente(int codigo);
    }
}
