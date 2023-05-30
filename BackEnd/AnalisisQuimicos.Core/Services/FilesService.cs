using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class FilesService : IRepository<Files>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public FilesService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task<Files> GetById(int id)
        {
            return await _unidadDeTrabajo.FilesRepository2.GetById(id);
        }

        public IEnumerable<Files> GetAll() 
        {
            var files = _unidadDeTrabajo.FilesRepository2.GetAll();
            
            return files;
        }

		public async Task Add(Files files)
		{
			await _unidadDeTrabajo.FilesRepository2.Add(files);
			await _unidadDeTrabajo.SaveChangesAsync();
		}

		public async void Update(Files files)
		{
			_unidadDeTrabajo.FilesRepository2.Update(files);
			await _unidadDeTrabajo.SaveChangesAsync();
		}

		public async Task Delete(int id)
		{
			await _unidadDeTrabajo.FilesRepository2.Delete(id);
			await _unidadDeTrabajo.SaveChangesAsync();

		}
	}
}
