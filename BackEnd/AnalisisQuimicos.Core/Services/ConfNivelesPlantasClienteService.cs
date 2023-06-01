using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.QueryFilters;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ConfNivelesPlantasClienteService : IConfNivelesPlantasClienteService//IRepository<ConfNivelesPlantasCliente>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ConfNivelesPlantasClienteService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            //await _unidadDeTrabajo.ComarcaRepository.Delete(id);
            await _unidadDeTrabajo.ConfNivelesPlantasClienteRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<ConfNivelesPlantasCliente> GetById(int id)
        {
            return await _unidadDeTrabajo.ConfNivelesPlantasClienteRepository.GetById(id);
        }

        public IEnumerable<ConfNivelesPlantasCliente> GetAll() //ClientesQueryFilter filtro
        {
            var clientes = _unidadDeTrabajo.ConfNivelesPlantasClienteRepository.GetAll();
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

        public async Task Add(ConfNivelesPlantasCliente confNivelesPlantasCliente)
        {
            //if (cliente.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir un cliente con ese nombre");
            //}
            await _unidadDeTrabajo.ConfNivelesPlantasClienteRepository.Add(confNivelesPlantasCliente);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(ConfNivelesPlantasCliente confNivelesPlantasCliente)
        {
            _unidadDeTrabajo.ConfNivelesPlantasClienteRepository.Update(confNivelesPlantasCliente);
            await _unidadDeTrabajo.SaveChangesAsync();
        }

        public IEnumerable<ConfNivelesPlantasCliente> GetByPlanta(ConfNivelesPlantasClienteQueryFilter filtro)
        {
            return _unidadDeTrabajo.ConfNivelesPlantasClienteRepository.GetByPlanta(filtro);
        }
    }
}
