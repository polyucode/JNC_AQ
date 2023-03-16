using AnalisisQuimicos.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IClientesContactosRepository : IRepository<ClientesContactos>
    {
        IEnumerable<ClientesContactos> GetByCodigoCliente(int codigo);
    }
}
