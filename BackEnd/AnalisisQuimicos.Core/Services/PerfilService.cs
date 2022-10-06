using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class PerfilService : IRepository<Perfiles>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public PerfilService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.PerfilRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<Perfiles> GetById(int id)
        {
            return await _unidadDeTrabajo.PerfilRepository.GetById(id);
        }

        public IEnumerable<Perfiles> GetAll() //PerfilesQueryFilter filtro
        {
            var clientes = _unidadDeTrabajo.PerfilRepository.GetAll();
            //if (filtro.Nombre != null)
            //{
            //    clientes = clientes.Where(x => x.Nombre.ToLower().Contains(filtro.Nombre.ToLower()));
            //}
            //if (filtro.Apellidos != null)
            //{
            //    clientes = clientes.Where(x => x.Apellidos.ToLower().Contains(filtro.Apellidos.ToLower()));
            //}
            //if (filtro.Telefono != null)
            //{
            //    clientes = clientes.Where(x => x.Telefono.ToLower().Contains(filtro.Telefono.ToLower()));
            //}
            ////if(filtro.Date != null)
            ////{
            ////    clientes = clientes.Where(x => x.AddDate.ToShortDateString() == filtro.Date?.ToShortDateString());

            ////}
            //if (filtro.IdPerfil != null)
            //{
            //    clientes = clientes.Where(x => x.IdPerfil == filtro.IdPerfil);
            //}
            return clientes;
        }

        public async Task Add(Perfiles cliente)
        {
            //if (cliente.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir un cliente con ese nombre");
            //}
            await _unidadDeTrabajo.PerfilRepository.Add(cliente);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(Perfiles cliente)
        {
            _unidadDeTrabajo.PerfilRepository.Update(cliente);
            await _unidadDeTrabajo.SaveChangesAsync();
        }

    }
}
