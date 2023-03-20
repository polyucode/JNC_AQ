using AnalisisQuimicos.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IUsuarioRepository : IRepository<Usuarios>
    {
        Task<IEnumerable<Usuarios>> GetUsuariosByPerfil(int idPerfil);

        Task<Usuarios> GetLoginByCredentials(UserLogin userLogin);

        Task<Usuarios> GetUsuariosByClient(int idClient);
    }
}
