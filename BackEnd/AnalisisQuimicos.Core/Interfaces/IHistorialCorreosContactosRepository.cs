using AnalisisQuimicos.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IHistorialCorreosContactosRepository : IRepository<HistorialCorreosEnviados>
    {
        bool InsertarHistorialCorreo(HistorialCorreosEnviados historial);
        List<HistorialCorreosEnviados> GetHistorialCorreosEnviadosByCodigoClienteEIdElemento(int codigoCliente, int idElemento);
    }
}
