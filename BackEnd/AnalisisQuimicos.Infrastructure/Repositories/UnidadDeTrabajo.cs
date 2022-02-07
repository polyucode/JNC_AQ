using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Infrastructure.Repositories
{
    public class UnidadDeTrabajo : IUnidadDeTrabajo
    {

        private readonly YucodeDevelopmentJNC_AQContext _context;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IRepository<Clientes> _clienteRepository;
        //private readonly IRepository<Comarcas> _comarcaRepository;
        private readonly IRepository<Perfiles> _perfilRepository;
        //private readonly IRepository<Poblaciones> _poblacionRepository;
        //private readonly IRepository<Provincias> _provinviaRepository;
        private readonly IRepository<ServMantenimientoCab> _servMantenimientoCabRepository;
        private readonly IRepository<ServMantenimientoDet> _servMantenimientoDetRepository;
        private readonly IRepository<ElementosPlanta> _ElementosPlantaRepository;
         
        public UnidadDeTrabajo(YucodeDevelopmentJNC_AQContext context)
        {
            _context = context;
        }

        public IUsuarioRepository UsuarioRepository => _usuarioRepository ?? new UsuarioRepository(_context);

        public IRepository<Clientes> ClienteRepository => _clienteRepository ?? new BaseRepository<Clientes>(_context);

        public IRepository<Perfiles> PerfilRepository => _perfilRepository ?? new BaseRepository<Perfiles>(_context);

        public IRepository<ServMantenimientoCab> ServMantenimientoCabRepository => _servMantenimientoCabRepository ?? new BaseRepository<ServMantenimientoCab>(_context);

        public IRepository<ServMantenimientoDet> ServMantenimientoDetRepository => _servMantenimientoDetRepository ?? new BaseRepository<ServMantenimientoDet>(_context);

        public void Dispose()
        {
            if(_context != null){
                _context.Dispose();
            }
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public async Task SaveChangesAsync()
        {
           await  _context.SaveChangesAsync();
        }
    }
}
