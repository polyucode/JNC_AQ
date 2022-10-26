using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.QueryFilters;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class AnalisisNivelesPlantasClienteService : IAnalisisNivelesPlantasClienteService
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public AnalisisNivelesPlantasClienteService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.AnalisisNivelesPlantasClienteRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<AnalisisNivelesPlantasCliente> GetById(int id)
        {
            return await _unidadDeTrabajo.AnalisisNivelesPlantasClienteRepository.GetById(id);
        }

        public IEnumerable<AnalisisNivelesPlantasCliente> GetAll() //ClientesQueryFilter filtro
        {
            var analisis = _unidadDeTrabajo.AnalisisNivelesPlantasClienteRepository.GetAll();
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
            return analisis;
        }

        public async Task Add(AnalisisNivelesPlantasCliente analisisNivelesPlantasCliente)
        {
            //if (cliente.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir un cliente con ese nombre");
            //}
            await _unidadDeTrabajo.AnalisisNivelesPlantasClienteRepository.Add(analisisNivelesPlantasCliente);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(AnalisisNivelesPlantasCliente analisisNivelesPlantasCliente)
        {
            _unidadDeTrabajo.AnalisisNivelesPlantasClienteRepository.Update(analisisNivelesPlantasCliente);
            await _unidadDeTrabajo.SaveChangesAsync();
        }

        public IEnumerable<AnalisisNivelesPlantasCliente> GetByNivelesPlanta(AnalisisNivelesPlantasClienteQueryFilter filtro)
        {
            return _unidadDeTrabajo.AnalisisNivelesPlantasClienteRepository.GetByNivelesPlanta(filtro);
        }
    }
}
