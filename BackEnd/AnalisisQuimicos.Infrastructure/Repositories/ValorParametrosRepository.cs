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
    public class ValorParametrosRepository : BaseRepository<ValorParametros>, IValorParametrosRepository
    {
        public ValorParametrosRepository(YucodeDevelopmentJNC_AQContext context) : base(context) { }
        public async Task<ValorParametros> GetParameters(ValorParametrosQueryFilter filtro)
        {
            var list = _entities.AsEnumerable();

            var sel = list.Where(x => x.CodigoCliente == filtro.CodigoCliente && x.Oferta == filtro.Oferta && x.Id_Elemento == filtro.Id_Elemento);

            return sel.ToArray()[0];
        }
    }
}
