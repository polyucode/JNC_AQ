using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ValorParametrosService : IRepository<ValorParametros>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ValorParametrosService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ValorParametrosRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<ValorParametros> GetById(int id)
        {
            return await _unidadDeTrabajo.ValorParametrosRepository.GetById(id);
        }

        public IEnumerable<ValorParametros> GetAll()
        {
            var valores = _unidadDeTrabajo.ValorParametrosRepository.GetAll();
            return valores;
        }

        public async Task Add(ValorParametros valor)
        {
            await _unidadDeTrabajo.ValorParametrosRepository.Add(valor);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(ValorParametros valor)
        {
            _unidadDeTrabajo.ValorParametrosRepository.Update(valor);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
