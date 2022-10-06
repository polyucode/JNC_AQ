using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class OfertasClientesService : IRepository<OfertasClientes>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public OfertasClientesService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.OfertasClientesRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<OfertasClientes> GetById(int id)
        {
            return await _unidadDeTrabajo.OfertasClientesRepository.GetById(id);
        }

        public IEnumerable<OfertasClientes> GetAll() //OfertasClientesQueryFilter filtro
        {
            var OfertasClientes = _unidadDeTrabajo.OfertasClientesRepository.GetAll();
            //if (filtro.Nombre != null)
            //{
            //    OfertasClientes = OfertasClientes.Where(x => x.Nombre.ToLower().Contains(filtro.Nombre.ToLower()));
            //}
            //if (filtro.Apellidos != null)
            //{
            //    OfertasClientes = OfertasClientes.Where(x => x.Apellidos.ToLower().Contains(filtro.Apellidos.ToLower()));
            //}
            //if (filtro.Telefono != null)
            //{
            //    OfertasClientes = OfertasClientes.Where(x => x.Telefono.ToLower().Contains(filtro.Telefono.ToLower()));
            //}
            ////if(filtro.Date != null)
            ////{
            ////    OfertasClientes = OfertasClientes.Where(x => x.AddDate.ToShortDateString() == filtro.Date?.ToShortDateString());

            ////}
            //if (filtro.IdPerfil != null)
            //{
            //    OfertasClientes = OfertasClientes.Where(x => x.IdPerfil == filtro.IdPerfil);
            //}
            return OfertasClientes;
        }

        public async Task Add(OfertasClientes oferta)
        {
            //if (oferta.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir una oferta con ese nombre");
            //}
            await _unidadDeTrabajo.OfertasClientesRepository.Add(oferta);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(OfertasClientes oferta)
        {
            _unidadDeTrabajo.OfertasClientesRepository.Update(oferta);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
