using AnalisisQuimicos.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IObservacionesElementosService: IRepository<ObservacionesElementos>
    {
        IEnumerable<ObservacionesElementos> GetComentariosByIdElemento(int idElemento);
    }
}
