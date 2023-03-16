using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.QueryFilters;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ParametrosAnalisisPlantaService : IParametrosAnalisisPlantaService
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ParametrosAnalisisPlantaService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ParametrosAnalisisPlantaRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<ParametrosAnalisisPlanta> GetById(int id)
        {
            return await _unidadDeTrabajo.ParametrosAnalisisPlantaRepository.GetById(id);
        }

        public IEnumerable<ParametrosAnalisisPlanta> GetAll() //ClientesContactosQueryFilter filtro
        {
            var ParametrosAnalisisPlanta = _unidadDeTrabajo.ParametrosAnalisisPlantaRepository.GetAll();
            return ParametrosAnalisisPlanta;
        }

        public async Task Add(ParametrosAnalisisPlanta analisis)
        {
            await _unidadDeTrabajo.ParametrosAnalisisPlantaRepository.Add(analisis);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(ParametrosAnalisisPlanta analisis)
        {
            _unidadDeTrabajo.ParametrosAnalisisPlantaRepository.Update(analisis);
            await _unidadDeTrabajo.SaveChangesAsync();
        }

        public IEnumerable<ParametrosAnalisisPlanta> GetAnalisis(ParametrosAnalisisQueryFilter analisisFilter)
        {
            return _unidadDeTrabajo.ParametrosAnalisisPlantaRepository.GetAnalisis(analisisFilter);
        }
    }
}
