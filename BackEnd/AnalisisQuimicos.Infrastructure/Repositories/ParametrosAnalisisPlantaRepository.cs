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
    public class ParametrosAnalisisPlantaRepository : BaseRepository<ParametrosAnalisisPlanta>, IParametrosAnalisisPlantaRepository
    {
        public ParametrosAnalisisPlantaRepository(YucodeDevelopmentJNC_AQContext context) : base(context) { }
        public IEnumerable<ParametrosAnalisisPlanta> GetAnalisis(ParametrosAnalisisQueryFilter analisisFilter)
        {
            var list = _entities.AsEnumerable();

            var sel = list.Where(x => x.CodigoCliente == analisisFilter.CodigoCliente && x.Oferta == analisisFilter.Oferta && x.Elemento == analisisFilter.Id_Elemento && x.Analisis == analisisFilter.Id_Analisis && x.Fecha == analisisFilter.Fecha);

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
