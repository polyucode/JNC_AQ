using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace AnalisisQuimicos.Core.Services
{
    public class ObservacionesElementosService: IObservacionesElementosService
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ObservacionesElementosService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public Task Add(ObservacionesElementos entity)
        {
            throw new NotImplementedException();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ObservacionesElementos> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<ObservacionesElementos> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ObservacionesElementos> GetComentariosByIdElemento(int idElemento)
        {
            try
            {
                var comentarios = _unidadDeTrabajo.ObservacionesElementos.GetAll();
                return (from logs in comentarios
                        where logs.IdElemento == idElemento
                        orderby logs.Fecha descending
                        select logs);
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public void Update(ObservacionesElementos entity)
        {
            throw new NotImplementedException();
        }
    }
}
