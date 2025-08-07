using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class OfertasContactosService : IRepository<OfertasContactos>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public OfertasContactosService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.OfertasContactosRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<OfertasContactos> GetById(int id)
        {
            return await _unidadDeTrabajo.OfertasContactosRepository.GetById(id);
        }


        public IEnumerable<OfertasContactos> GetAll()
        {
            var OfertasClientes = _unidadDeTrabajo.OfertasContactosRepository.GetAll();

            return OfertasClientes;
        }

        public async Task Add(OfertasContactos oferta)
        {
            //if (oferta.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir una oferta con ese nombre");
            //}
            await _unidadDeTrabajo.OfertasContactosRepository.Add(oferta);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(OfertasContactos oferta)
        {
            _unidadDeTrabajo.OfertasContactosRepository.Update(oferta);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
