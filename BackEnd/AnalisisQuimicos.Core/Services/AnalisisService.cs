using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class AnalisisService : IRepository<Analisis>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public AnalisisService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.AnalisisRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<Analisis> GetById(int id)
        {
            return await _unidadDeTrabajo.AnalisisRepository.GetById(id);
        }

        public IEnumerable<Analisis> GetAll() //ClientesQueryFilter filtro
        {
            var analisis = _unidadDeTrabajo.AnalisisRepository.GetAll();
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

        public async Task Add(Analisis analisis)
        {
            //if (cliente.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir un cliente con ese nombre");
            //}
            await _unidadDeTrabajo.AnalisisRepository.Add(analisis);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(Analisis analisis)
        {
            _unidadDeTrabajo.AnalisisRepository.Update(analisis);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
