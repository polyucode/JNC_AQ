using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ClienteService : IRepository<Clientes>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ClienteService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ClienteRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<Clientes> GetById(int id)
        {
            return await _unidadDeTrabajo.ClienteRepository.GetById(id);
        }

        public IEnumerable<Clientes> GetAll() //ClientesQueryFilter filtro
        {
            var clientes = _unidadDeTrabajo.ClienteRepository.GetAll();
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

        public async Task Add(Clientes cliente)
        {
            //if (cliente.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir un cliente con ese nombre");
            //}
            await _unidadDeTrabajo.ClienteRepository.Add(cliente);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(Clientes cliente)
        {
            _unidadDeTrabajo.ClienteRepository.Update(cliente);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
