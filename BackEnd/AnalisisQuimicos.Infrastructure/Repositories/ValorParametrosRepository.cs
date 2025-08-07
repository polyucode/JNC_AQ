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

        public IEnumerable<ValorParametros> GetParameters(ValorParametrosQueryFilter filtro)
        {
            var list = _entities.AsEnumerable();

            IEnumerable<ValorParametros> sel;

            if(filtro.Fecha == null)
            {
                sel = list.Where(x => x.CodigoCliente == filtro.CodigoCliente && x.Oferta == filtro.Oferta && x.Id_Elemento == filtro.Id_Elemento && x.Id_Analisis == filtro.Id_Analisis && x.Deleted != true);
            }
            else
            {
                sel = list.Where(x => x.CodigoCliente == filtro.CodigoCliente && x.Oferta == filtro.Oferta && x.Id_Elemento == filtro.Id_Elemento && x.Id_Analisis == filtro.Id_Analisis && x.Fecha == filtro.Fecha && x.Deleted != true);

                if (sel.ToArray().Length == 0)
                {
                    sel = list.Where(x => x.CodigoCliente == filtro.CodigoCliente && x.Oferta == filtro.Oferta && x.Id_Elemento == filtro.Id_Elemento && x.Id_Analisis == filtro.Id_Analisis && x.Fecha == null && x.Deleted != true);
                }
            }

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
