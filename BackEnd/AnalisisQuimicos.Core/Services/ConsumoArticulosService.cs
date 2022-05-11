using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ConsumoArticulosService : IRepository<ConsumoArticulos>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ConsumoArticulosService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ConsumoArticulosRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<ConsumoArticulos> GetById(int id)
        {
            return await _unidadDeTrabajo.ConsumoArticulosRepository.GetById(id);
        }

        public IEnumerable<ConsumoArticulos> GetAll() //ClientesContactosQueryFilter filtro
        {
            var ConsumoArticulos = _unidadDeTrabajo.ConsumoArticulosRepository.GetAll();
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
            return ConsumoArticulos;
        }

        public async Task Add(ConsumoArticulos articulo)
        {
            //if (cliente.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir un cliente con ese nombre");
            //}
            await _unidadDeTrabajo.ConsumoArticulosRepository.Add(articulo);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(ConsumoArticulos articulo)
        {
            _unidadDeTrabajo.ConsumoArticulosRepository.Update(articulo);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
