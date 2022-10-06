using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class TareasService : IRepository<Tareas>
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public TareasService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.TareasRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<Tareas> GetById(int id)
        {
            return await _unidadDeTrabajo.TareasRepository.GetById(id);
        }

        public IEnumerable<Tareas> GetAll() //ServMantenimientoCabQueryFilter filtro
        {
            var tareas = _unidadDeTrabajo.TareasRepository.GetAll();
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
            return tareas;
        }

        public async Task Add(Tareas tarea)
        {
            //if (cliente.Nombre == "NoPermitir")
            //{
            //    throw new BussinesException("No se puede añadir un cliente con ese nombre");
            //}
            await _unidadDeTrabajo.TareasRepository.Add(tarea);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(Tareas tarea)
        {
            _unidadDeTrabajo.TareasRepository.Update(tarea);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
