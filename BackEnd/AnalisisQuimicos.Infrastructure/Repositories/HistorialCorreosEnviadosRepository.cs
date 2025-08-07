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
    public class HistorialCorreosEnviadosRepository : BaseRepository<HistorialCorreosEnviados>, IHistorialCorreosContactosRepository
    {
        private YucodeDevelopmentJNC_AQContext _db;
        public HistorialCorreosEnviadosRepository(YucodeDevelopmentJNC_AQContext context) : base(context) 
        {
            _db = context;
        }

        public bool InsertarHistorialCorreo(HistorialCorreosEnviados historial)
        {

            try
            {
                _db.Add(historial);
                _db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<HistorialCorreosEnviados> GetHistorialCorreosEnviadosByCodigoClienteEIdElemento(int codigoCliente, int idElemento)
        {
            return (from logs in _db.GesHistorialCorreosEnviados where logs.CodigoCliente == codigoCliente && logs.IdElemento == idElemento orderby logs.Fecha descending select logs).ToList();
        }
    }
}
