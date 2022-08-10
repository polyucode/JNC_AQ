using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class ConsumosService : IRepository<Consumos>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ConsumosService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ConsumosRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<Consumos> GetById(int id)
        {
            return await _unidadDeTrabajo.ConsumosRepository.GetById(id);
        }

        public IEnumerable<Consumos> GetAll() //ClientesQueryFilter filtro
        {
            var consumos = _unidadDeTrabajo.ConsumosRepository.GetAll();
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
            return consumos;
        }

        public async Task Add(Consumos consumos)
        {
            //if (cliente.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir un cliente con ese nombre");
            //}
            await _unidadDeTrabajo.ConsumosRepository.Add(consumos);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(Consumos consumos)
        {
            _unidadDeTrabajo.ConsumosRepository.Update(consumos);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
