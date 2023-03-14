using AnalisisQuimicos.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IClienteRepository : IRepository<Clientes>
    {
        Task<Clientes> GetByCodigoCliente(int codigo);
    }
}
