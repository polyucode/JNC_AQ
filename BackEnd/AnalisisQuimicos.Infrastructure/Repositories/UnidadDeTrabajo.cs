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
        private readonly IRepository<Archivos> _archivosRepository;
        private readonly IRepository<Analisis> _analisisRepository;
        private readonly IRepository<Clientes> _clienteRepository;
        private readonly IRepository<Comarcas> _comarcaRepository;
        private readonly IRepository<Perfiles> _perfilRepository;
        private readonly IRepository<Poblaciones> _poblacionRepository;
        private readonly IRepository<Provincias> _provinviaRepository;
        private readonly IRepository<Tareas> _tareasRepository;
        private readonly IRepository<ServMantenimientoDet> _servMantenimientoDetRepository;
        private readonly IRepository<ElementosPlanta> _elementosPlantaRepository;
        private readonly IRepository<ConfNivelesPlantasCliente> _confNivelesPlantasClienteRepository;
        private readonly IRepository<ConfPlantasCliente> _confPlantasClienteRepository;
        private readonly IParametrosElementoPlantaClienteRepository _parametrosElementoPlantaClienteRepository;
        private readonly IRepository<ParametrosAnalisisPlanta> _parametrosAnalisisPlantaRepository;
        private readonly IRepository<AnalisisNivelesPlantasCliente> _analisisNivelesPlantasClienteRepository;
        private readonly IRepository<ClientesContactos> _clientesContactosRepository;
        private readonly IRepository<OfertasClientes> _ofertasClientesRepository;
        private readonly IRepository<Productos> _productosRepository;
        private readonly IRepository<Consumos> _consumosRepository;

        public UnidadDeTrabajo(YucodeDevelopmentJNC_AQContext context)
        {
            _context = context;
        }

        public IUsuarioRepository UsuarioRepository => _usuarioRepository ?? new UsuarioRepository(_context);

        public IRepository<Archivos> ArchivosRepository => _archivosRepository ?? new BaseRepository<Archivos>(_context);

        public IRepository<Analisis> AnalisisRepository => _analisisRepository ?? new BaseRepository<Analisis>(_context);

        public IRepository<Clientes> ClienteRepository => _clienteRepository ?? new BaseRepository<Clientes>(_context);

        public IRepository<Perfiles> PerfilRepository => _perfilRepository ?? new BaseRepository<Perfiles>(_context);

        public IRepository<Tareas> TareasRepository => _tareasRepository ?? new BaseRepository<Tareas>(_context);

        public IRepository<ServMantenimientoDet> ServMantenimientoDetRepository => _servMantenimientoDetRepository ?? new BaseRepository<ServMantenimientoDet>(_context);

        public IRepository<Comarcas> ComarcaRepository => _comarcaRepository ?? new BaseRepository<Comarcas>(_context);
        public IRepository<Poblaciones> PoblacionRepository => _poblacionRepository ?? new BaseRepository<Poblaciones>(_context);
        public IRepository<Provincias> ProvinciaRepository => _provinviaRepository ?? new BaseRepository<Provincias>(_context);


        public IRepository<ElementosPlanta> ElementosPlantaRepository => _elementosPlantaRepository ?? new BaseRepository<ElementosPlanta>(_context);

        public IRepository<ConfNivelesPlantasCliente> ConfNivelesPlantasClienteRepository => _confNivelesPlantasClienteRepository ?? new BaseRepository<ConfNivelesPlantasCliente>(_context);

        public IRepository<ConfPlantasCliente> ConfPlantasClienteRepository => _confPlantasClienteRepository ?? new BaseRepository<ConfPlantasCliente>(_context);

        public IParametrosElementoPlantaClienteRepository ParametrosElementoPlantaClienteRepository => _parametrosElementoPlantaClienteRepository ?? new ParametrosElementoPlantaClienteRepository(_context);

        public IRepository<ParametrosAnalisisPlanta> ParametrosAnalisisPlantaRepository => _parametrosAnalisisPlantaRepository ?? new BaseRepository<ParametrosAnalisisPlanta>(_context);

        public IRepository<AnalisisNivelesPlantasCliente> AnalisisNivelesPlantasClienteRepository => _analisisNivelesPlantasClienteRepository ?? new BaseRepository<AnalisisNivelesPlantasCliente>(_context);
        public IRepository<ClientesContactos> ClientesContactosRepository => _clientesContactosRepository ?? new BaseRepository<ClientesContactos>(_context);

        public IRepository<OfertasClientes> OfertasClientesRepository => _ofertasClientesRepository ?? new BaseRepository<OfertasClientes>(_context);

        public IRepository<Productos> ProductosRepository => _productosRepository ?? new BaseRepository<Productos>(_context);
        public IRepository<Consumos> ConsumosRepository => _consumosRepository ?? new BaseRepository<Consumos>(_context);

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
