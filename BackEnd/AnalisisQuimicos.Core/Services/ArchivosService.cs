using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ArchivosService : IRepository<Archivos>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ArchivosService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ArchivosRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<Archivos> GetById(int id)
        {
            return await _unidadDeTrabajo.ArchivosRepository.GetById(id);
        }

        public IEnumerable<Archivos> GetAll()
        {
            var archivos = _unidadDeTrabajo.ArchivosRepository.GetAll();
            return archivos;
        }

        public async Task Add(Archivos archivos)
        {
            await _unidadDeTrabajo.ArchivosRepository.Add(archivos);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(Archivos archivos)
        {
            _unidadDeTrabajo.ArchivosRepository.Update(archivos);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
