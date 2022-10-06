using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ArticulosService : IRepository<Articulos>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ArticulosService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ArticulosRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<Articulos> GetById(int id)
        {
            return await _unidadDeTrabajo.ArticulosRepository.GetById(id);
        }

        public IEnumerable<Articulos> GetAll() //ArticulosQueryFilter filtro
        {
            var Articulos = _unidadDeTrabajo.ArticulosRepository.GetAll();
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
            return Articulos;
        }

        public async Task Add(Articulos articulo)
        {
            //if (oferta.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir una oferta con ese nombre");
            //}
            await _unidadDeTrabajo.ArticulosRepository.Add(articulo);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(Articulos articulo)
        {
            _unidadDeTrabajo.ArticulosRepository.Update(articulo);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
