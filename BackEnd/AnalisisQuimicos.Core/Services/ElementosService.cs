using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ElementosService : IRepository<Elementos>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ElementosService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ElementosRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<Elementos> GetById(int id)
        {
            return await _unidadDeTrabajo.ElementosRepository.GetById(id);
        }

        public IEnumerable<Elementos> GetAll()
        {
            var elementos = _unidadDeTrabajo.ElementosRepository.GetAll();
            return elementos;
        }

        public async Task Add(Elementos elemento)
        {

            await _unidadDeTrabajo.ElementosRepository.Add(elemento);
            await _unidadDeTrabajo.SaveChangesAsync();
        }

        public async void Update(Elementos envio)
        {
            _unidadDeTrabajo.ElementosRepository.Update(envio);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}

