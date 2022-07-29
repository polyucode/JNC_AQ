using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.QueryFilters;
using AnalisisQuimicos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Infrastructure.Repositories
{
    public class ParametrosElementoPlantaClienteRepository : BaseRepository<ParametrosElementoPlantaCliente>, IParametrosElementoPlantaClienteRepository
    {
        public ParametrosElementoPlantaClienteRepository(YucodeDevelopmentJNC_AQContext context) : base(context) { }
        public async Task<ParametrosElementoPlantaCliente> GetParameters(ParametrosElementoQueryFilter filtro)
        {
            var list = _entities.AsEnumerable();

            var sel = list.Where(x => x.CodigoCliente == filtro.CodigoCliente && x.Oferta == filtro.Oferta && x.Elemento == filtro.Elemento);

            return sel.ToArray()[0];
        }
    }
}
