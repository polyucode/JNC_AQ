using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ParametrosService : IRepository<Parametros>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ParametrosService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Add(Parametros entity)
        {
            await _unidadDeTrabajo.ParametrosRepository.Add(entity);
            await _unidadDeTrabajo.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ParametrosRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();
        }

        public IEnumerable<Parametros> GetAll()
        {
            var parametros = _unidadDeTrabajo.ParametrosRepository.GetAll();
            return parametros;
        }

        public async Task<Parametros> GetById(int id)
        {
            return await _unidadDeTrabajo.ParametrosRepository.GetById(id);
        }

        public async void Update(Parametros entity)
        {
            _unidadDeTrabajo.ParametrosRepository.Update(entity);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
