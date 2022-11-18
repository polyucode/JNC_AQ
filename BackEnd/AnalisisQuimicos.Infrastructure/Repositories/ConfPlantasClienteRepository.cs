using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.QueryFilters;
using AnalisisQuimicos.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Infrastructure.Repositories
{
    public class ConfPlantasClienteRepository : BaseRepository<ConfPlantasCliente>, IConfPlantasClienteRepository
    {
        public ConfPlantasClienteRepository(YucodeDevelopmentJNC_AQContext context) : base(context) { }

        public async Task<ConfPlantasCliente> GetByClient(ConfPlantasClienteQueryFilter filtro)
        {
            var list = _entities.AsEnumerable();

            var sel = list.Where(x => x.CodigoCliente == filtro.CodigoCliente && x.Oferta == filtro.Oferta);

            if( sel.ToArray().Length != 0 )
            {
                return sel.ToArray()[0];
            } else {
                return null;
            }
        }
    }
}
