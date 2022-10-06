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

        public IEnumerable<OfertasProductos> GetAll() //ClientesContactosQueryFilter filtro
        {
            var OfertasProductos = _unidadDeTrabajo.OfertasProductosRepository.GetAll();
            //if (filtro.Nombre != null)
            //{
            //    ClientesContactos = ClientesContactos.Where(x => x.Nombre.ToLower().Contains(filtro.Nombre.ToLower()));
            //}
            //if (filtro.Apellidos != null)
            //{
            //    ClientesContactos = ClientesContactos.Where(x => x.Apellidos.ToLower().Contains(filtro.Apellidos.ToLower()));
            //}
            //if (filtro.Telefono != null)
            //{
            //    ClientesContactos = ClientesContactos.Where(x => x.Telefono.ToLower().Contains(filtro.Telefono.ToLower()));
            //}
            ////if(filtro.Date != null)
            ////{
            ////    ClientesContactos = ClientesContactos.Where(x => x.AddDate.ToShortDateString() == filtro.Date?.ToShortDateString());

            ////}
            //if (filtro.IdPerfil != null)
            //{
            //    ClientesContactos = ClientesContactos.Where(x => x.IdPerfil == filtro.IdPerfil);
            //}
            return OfertasProductos;
        }

        public async Task Add(OfertasProductos producto)
        {
            //if (cliente.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir un cliente con ese nombre");
            //}
            await _unidadDeTrabajo.OfertasProductosRepository.Add(producto);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(OfertasProductos producto)
        {
            _unidadDeTrabajo.OfertasProductosRepository.Update(producto);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
