using AnalisisQuimicos.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IHistorialCorreosContactosService
    {
         List<HistorialCorreosEnviados> GetHistorialCorreosContactos(int idCliente, int idElemento);
         Task InsertarHistorialCorreosContactos(HistorialCorreosEnviados historialCorreosEnviados);
    }
}
