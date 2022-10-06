using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.QueryFilters;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IUsuarioService
    {
        IEnumerable<Usuarios> GetUsuarios(UsuariosQueryFilter filtro);

        Task<Usuarios> GetUsuario(int id);

        Task InsertUsuario(Usuarios usuario);

        Task<bool> DeleteUsuario(int id);

        Task<bool> UpdateUsuario(Usuarios usuario);

        Task<Usuarios> GetLoginByCredentials(UserLogin userLogin);

        Task RegisterUser(Usuarios usuario);
    }
}