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
    public class ClienteRepository : BaseRepository<Clientes>, IClienteRepository
    {
        public ClienteRepository(YucodeDevelopmentJNC_AQContext context) : base(context) { }

        public async Task<Clientes> GetByCodigoCliente(int codigo)
        {
            var list = _entities.AsEnumerable();
            var sel = list.Where(x => x.Codigo == codigo && x.Deleted != true);

            if (sel.ToArray().Length != 0)
            {
                return sel.ToArray()[0];
            }
            else
            {
                return null;
            }
        }
    }
}
