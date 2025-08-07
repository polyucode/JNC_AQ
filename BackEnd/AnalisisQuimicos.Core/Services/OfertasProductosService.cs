using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class OfertasProductosService : IRepository<OfertasProductos>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public OfertasProductosService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.OfertasProductosRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<OfertasProductos> GetById(int id)
        {
            return await _unidadDeTrabajo.OfertasProductosRepository.GetById(id);
        }


        public IEnumerable<OfertasProductos> GetAll()
        {
            var OfertasProductosAsociados = _unidadDeTrabajo.OfertasProductosRepository.GetAll();

            return OfertasProductosAsociados;
        }

        public async Task Add(OfertasProductos oferta)
        {
            //if (oferta.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir una oferta con ese nombre");
            //}
            await _unidadDeTrabajo.OfertasProductosRepository.Add(oferta);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(OfertasProductos oferta)
        {
            _unidadDeTrabajo.OfertasProductosRepository.Update(oferta);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
