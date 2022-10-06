using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ClientesContactosService : IRepository<ClientesContactos>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ClientesContactosService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ClientesContactosRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<ClientesContactos> GetById(int id)
        {
            return await _unidadDeTrabajo.ClientesContactosRepository.GetById(id);
        }

        public IEnumerable<ClientesContactos> GetAll() //ClientesContactosQueryFilter filtro
        {
            var ClientesContactos = _unidadDeTrabajo.ClientesContactosRepository.GetAll();
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
            return ClientesContactos;
        }

        public async Task Add(ClientesContactos cliente)
        {
            //if (cliente.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir un cliente con ese nombre");
            //}
            await _unidadDeTrabajo.ClientesContactosRepository.Add(cliente);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(ClientesContactos cliente)
        {
            _unidadDeTrabajo.ClientesContactosRepository.Update(cliente);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
