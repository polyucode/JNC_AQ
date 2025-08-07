using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Infrastructure.Repositories
{
    public class ClientesContactosRepository : BaseRepository<ClientesContactos>, IClientesContactosRepository
    {
        public ClientesContactosRepository(YucodeDevelopmentJNC_AQContext context) : base(context) { }

        public IEnumerable<ClientesContactos> GetByCodigoCliente(int codigo)
        {
            var list = _entities.AsEnumerable();
            var sel = list.Where(x => x.CodigoCliente == codigo && x.Deleted != true);

            if (sel.ToArray().Length != 0)
            {
                return sel.ToArray();
            }
            else
            {
                return null;
            }
        }
    }
}
