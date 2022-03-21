using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ParametrosElementoPlantaClienteService : IRepository<ParametrosElementoPlantaCliente>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ParametrosElementoPlantaClienteService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ParametrosElementoPlantaClienteRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<ParametrosElementoPlantaCliente> GetById(int id)
        {
            return await _unidadDeTrabajo.ParametrosElementoPlantaClienteRepository.GetById(id);
        }

        public IEnumerable<ParametrosElementoPlantaCliente> GetAll() //ClientesQueryFilter filtro
        {
            var clientes = _unidadDeTrabajo.ParametrosElementoPlantaClienteRepository.GetAll();
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

        public async Task Add(ParametrosElementoPlantaCliente parametrosElementoPlantaCliente)
        {
            //if (cliente.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir un cliente con ese nombre");
            //}
            await _unidadDeTrabajo.ParametrosElementoPlantaClienteRepository.Add(parametrosElementoPlantaCliente);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(ParametrosElementoPlantaCliente parametrosElementoPlantaCliente)
        {
            _unidadDeTrabajo.ParametrosElementoPlantaClienteRepository.Update(parametrosElementoPlantaCliente);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
