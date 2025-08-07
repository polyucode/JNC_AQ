using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class HistorialCorreosEnviadosService :IHistorialCorreosContactosService
    {
        private readonly IUnidadDeTrabajo _unidadTrabajo;
        public HistorialCorreosEnviadosService(IUnidadDeTrabajo unidadTrabajo)
        {
            _unidadTrabajo = unidadTrabajo;
        }

        public List<HistorialCorreosEnviados> GetHistorialCorreosContactos(int idCliente, int idElemento)
        {
            return _unidadTrabajo.HistorialCorreosContactosRepository.GetHistorialCorreosEnviadosByCodigoClienteEIdElemento(idCliente, idElemento);
        }

        public async Task InsertarHistorialCorreosContactos(HistorialCorreosEnviados historialCorreosEnviados)
        {
            throw new NotImplementedException();
        }
    }
}
