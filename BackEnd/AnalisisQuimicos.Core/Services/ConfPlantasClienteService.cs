using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.QueryFilters;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ConfPlantasClienteService : IConfPlantasClienteService//IRepository<ConfPlantasCliente>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ConfPlantasClienteService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ConfPlantasClienteRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<ConfPlantasCliente> GetById(int id)
        {
            return await _unidadDeTrabajo.ConfPlantasClienteRepository.GetById(id);
        }

        public IEnumerable<ConfPlantasCliente> GetAll() //ClientesQueryFilter filtro
        {
            var clientes = _unidadDeTrabajo.ConfPlantasClienteRepository.GetAll();
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

        public async Task Add(ConfPlantasCliente confPlantasCliente)
        {
            //if (cliente.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir un cliente con ese nombre");
            //}
            await _unidadDeTrabajo.ConfPlantasClienteRepository.Add(confPlantasCliente);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(ConfPlantasCliente confPlantasCliente)
        {
            _unidadDeTrabajo.ConfPlantasClienteRepository.Update(confPlantasCliente);
            await _unidadDeTrabajo.SaveChangesAsync();
        }

        public async Task<ConfPlantasCliente> GetByClient(ConfPlantasClienteQueryFilter filtro)
        {
            return await _unidadDeTrabajo.ConfPlantasClienteRepository.GetByClient(filtro);
        }
    }
}
