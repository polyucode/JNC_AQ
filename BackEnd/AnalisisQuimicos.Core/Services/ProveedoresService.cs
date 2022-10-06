using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ProveedoresService : IRepository<Proveedores>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ProveedoresService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ProveedoresRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<Proveedores> GetById(int id)
        {
            return await _unidadDeTrabajo.ProveedoresRepository.GetById(id);
        }

        public IEnumerable<Proveedores> GetAll()
        {
            var proveedores = _unidadDeTrabajo.ProveedoresRepository.GetAll();
            return proveedores;
        }

        public async Task Add(Proveedores proveedor)
        {
       
            await _unidadDeTrabajo.ProveedoresRepository.Add(proveedor);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(Proveedores proveedor)
        {
            _unidadDeTrabajo.ProveedoresRepository.Update(proveedor);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
