using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class CorreosService : IRepository<Correos>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public CorreosService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.CorreosRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<Correos> GetById(int id)
        {
            return await _unidadDeTrabajo.CorreosRepository.GetById(id);
        }

        public IEnumerable<Correos> GetAll()
        {
            var analisis = _unidadDeTrabajo.CorreosRepository.GetAll();
            return analisis;
        }

        public async Task Add(Correos correos)
        {
            await _unidadDeTrabajo.CorreosRepository.Add(correos);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(Correos correos)
        {
            _unidadDeTrabajo.CorreosRepository.Update(correos);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
