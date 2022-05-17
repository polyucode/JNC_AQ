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

        public IEnumerable<Consumos> GetAll() //ClientesContactosQueryFilter filtro
        {
            var Consumos = _unidadDeTrabajo.ConsumosRepository.GetAll();
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
            return Consumos;
        }

        public async Task Add(Consumos consumo)
        {
            //if (cliente.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir un cliente con ese nombre");
            //}
            await _unidadDeTrabajo.ConsumosRepository.Add(consumo);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(Consumos consumo)
        {
            _unidadDeTrabajo.ConsumosRepository.Update(consumo);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
