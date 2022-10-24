using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.QueryFilters;
using AnalisisQuimicos.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Repositories
{
    public class AnalisisNivelesPlantasClienteRepository : BaseRepository<AnalisisNivelesPlantasCliente>, IAnalisisNivelesPlantasClienteRepository
    {
        public AnalisisNivelesPlantasClienteRepository(YucodeDevelopmentJNC_AQContext context) : base(context) { }

        public IEnumerable<AnalisisNivelesPlantasCliente> GetByNivelesPlanta(AnalisisNivelesPlantasClienteQueryFilter filtro)
        {
            var list = _entities.AsEnumerable();

            var sel = list.Where(x => x.Id_NivelesPlanta == filtro.Id_NivelesPlanta);

            return sel.ToArray();
        }
    }
}
