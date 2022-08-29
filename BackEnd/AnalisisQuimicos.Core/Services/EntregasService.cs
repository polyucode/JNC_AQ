using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class EntregasService : IRepository<Entregas>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public EntregasService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.TareasRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<Entregas> GetById(int id)
        {
            return await _unidadDeTrabajo.EntregasRepository.GetById(id);
        }

        public IEnumerable<Entregas> GetAll()
        {
            var entregas = _unidadDeTrabajo.EntregasRepository.GetAll();
            return entregas;
        }

        public async Task Add(Entregas entrega)
        {
            await _unidadDeTrabajo.EntregasRepository.Add(entrega);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(Entregas entrega)
        {
            _unidadDeTrabajo.EntregasRepository.Update(entrega);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
