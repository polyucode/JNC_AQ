using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Infrastructure.Repositories
{
    public class UsuarioRepository : BaseRepository<Usuarios>, IUsuarioRepository
    {
        public UsuarioRepository(YucodeDevelopmentJNC_AQContext context ) : base(context) { }

        public async Task<Usuarios> GetLoginByCredentials(UserLogin userLogin)
        {
            return await _entities.FirstOrDefaultAsync(x => x.Usuario == userLogin.User);
        }

        public async Task<IEnumerable<Usuarios>> GetUsuariosByPerfil(int idPerfil)
        {
            return await _entities.Where(x => x.IdPerfil == idPerfil).ToListAsync();
        }
    }
}
