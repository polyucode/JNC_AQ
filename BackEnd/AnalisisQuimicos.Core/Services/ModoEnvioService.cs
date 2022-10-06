using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ModoEnvioService : IRepository<ModoEnvio>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ModoEnvioService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ModoEnvioRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<ModoEnvio> GetById(int id)
        {
            return await _unidadDeTrabajo.ModoEnvioRepository.GetById(id);
        }

        public IEnumerable<ModoEnvio> GetAll()
        {
            var envios = _unidadDeTrabajo.ModoEnvioRepository.GetAll();
            return envios;
        }

        public async Task Add(ModoEnvio envio)
        {

            await _unidadDeTrabajo.ModoEnvioRepository.Add(envio);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(ModoEnvio envio)
        {
            _unidadDeTrabajo.ModoEnvioRepository.Update(envio);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}

