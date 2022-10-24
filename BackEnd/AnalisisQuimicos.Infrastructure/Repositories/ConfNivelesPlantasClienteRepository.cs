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
    public class ConfNivelesPlantasClienteRepository : BaseRepository<ConfNivelesPlantasCliente>, IConfNivelesPlantasClienteRepository
    {
        public ConfNivelesPlantasClienteRepository(YucodeDevelopmentJNC_AQContext context) : base(context) { }

        public IEnumerable<ConfNivelesPlantasCliente> GetByPlanta(ConfNivelesPlantasClienteQueryFilter filtro)
        {
            var list = _entities.AsEnumerable();

            var sel = list.Where(x => x.Id_Planta == filtro.Id_Planta);

            return sel.ToArray();
        }
    }
}
