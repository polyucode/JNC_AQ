using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ProductosService : IRepository<Productos>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ProductosService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ProductosRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<Productos> GetById(int id)
        {
            return await _unidadDeTrabajo.ProductosRepository.GetById(id);
        }

        public IEnumerable<Productos> GetAll() //ArticulosQueryFilter filtro
        {
            var Productos = _unidadDeTrabajo.ProductosRepository.GetAll();
            //if (filtro.Nombre != null)
            //{
            //    Articulos = Articulos.Where(x => x.Nombre.ToLower().Contains(filtro.Nombre.ToLower()));
            //}
            //if (filtro.Apellidos != null)
            //{
            //    Articulos = Articulos.Where(x => x.Apellidos.ToLower().Contains(filtro.Apellidos.ToLower()));
            //}
            //if (filtro.Telefono != null)
            //{
            //    Articulos = Articulos.Where(x => x.Telefono.ToLower().Contains(filtro.Telefono.ToLower()));
            //}
            ////if(filtro.Date != null)
            ////{
            ////   Articulos = OfertasClientes.Where(x => x.AddDate.ToShortDateString() == filtro.Date?.ToShortDateString());

            ////}
            //if (filtro.IdPerfil != null)
            //{
            //    OfertasClientes = OfertasClientes.Where(x => x.IdPerfil == filtro.IdPerfil);
            //}
            return Productos;
        }

        public async Task Add(Productos producto)
        {
            //if (oferta.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir una oferta con ese nombre");
            //}
            await _unidadDeTrabajo.ProductosRepository.Add(producto);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(Productos producto)
        {
            _unidadDeTrabajo.ProductosRepository.Update(producto);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
