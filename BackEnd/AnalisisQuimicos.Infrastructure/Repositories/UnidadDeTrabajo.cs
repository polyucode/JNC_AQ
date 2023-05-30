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
        private readonly IClienteRepository _clienteRepository;
        private readonly IRepository<Comarcas> _comarcaRepository;
        private readonly IRepository<Perfiles> _perfilRepository;
        private readonly IRepository<Poblaciones> _poblacionRepository;
        private readonly IRepository<Provincias> _provinviaRepository;
        private readonly IRepository<Tareas> _tareasRepository;
        private readonly IRepository<ServMantenimientoDet> _servMantenimientoDetRepository;
        private readonly IRepository<ElementosPlanta> _elementosPlantaRepository;
        private readonly IConfNivelesPlantasClienteRepository _confNivelesPlantasClienteRepository;
        private readonly IConfPlantasClienteRepository _confPlantasClienteRepository;
        private readonly IParametrosElementoPlantaClienteRepository _parametrosElementoPlantaClienteRepository;
        private readonly IParametrosAnalisisPlantaRepository _parametrosAnalisisPlantaRepository;
        private readonly IAnalisisNivelesPlantasClienteRepository _analisisNivelesPlantasClienteRepository;
        private readonly IClientesContactosRepository _clientesContactosRepository;
        private readonly IRepository<OfertasClientes> _ofertasClientesRepository;
        private readonly IRepository<Productos> _productosRepository;
        private readonly IRepository<OfertasProductos> _ofertasProductosRepository;
        private readonly IRepository<Consumos> _consumosRepository;
        private readonly IValorParametrosRepository _valorParametrosRepository;
        private readonly IRepository<Entregas> _entregasRepository;
        private readonly IRepository<Proveedores> _proveedoresRepository;
        private readonly IRepository<ModoEnvio> _modoEnvioRepository;
        private readonly IRepository<Elementos> _elementosRepository;
        private readonly IRepository<Parametros> _parametrosRepository;
        private readonly IFilesRepository _elementosFiles;

        private readonly IRepository<Files> _filesRepository;

        public UnidadDeTrabajo(YucodeDevelopmentJNC_AQContext context)
        {
            _context = context;
        }

        public IUsuarioRepository UsuarioRepository => _usuarioRepository ?? new UsuarioRepository(_context);

        public IRepository<Archivos> ArchivosRepository => _archivosRepository ?? new BaseRepository<Archivos>(_context);

        public IRepository<Analisis> AnalisisRepository => _analisisRepository ?? new BaseRepository<Analisis>(_context);

        public IClienteRepository ClienteRepository => _clienteRepository ?? new ClienteRepository(_context);

        public IRepository<Perfiles> PerfilRepository => _perfilRepository ?? new BaseRepository<Perfiles>(_context);

        public IRepository<Tareas> TareasRepository => _tareasRepository ?? new BaseRepository<Tareas>(_context);

        public IRepository<ServMantenimientoDet> ServMantenimientoDetRepository => _servMantenimientoDetRepository ?? new BaseRepository<ServMantenimientoDet>(_context);

        public IRepository<Comarcas> ComarcaRepository => _comarcaRepository ?? new BaseRepository<Comarcas>(_context);
        public IRepository<Poblaciones> PoblacionRepository => _poblacionRepository ?? new BaseRepository<Poblaciones>(_context);
        public IRepository<Provincias> ProvinciaRepository => _provinviaRepository ?? new BaseRepository<Provincias>(_context);


        public IRepository<ElementosPlanta> ElementosPlantaRepository => _elementosPlantaRepository ?? new BaseRepository<ElementosPlanta>(_context);

        public IConfNivelesPlantasClienteRepository ConfNivelesPlantasClienteRepository => _confNivelesPlantasClienteRepository ?? new ConfNivelesPlantasClienteRepository(_context);

        public IConfPlantasClienteRepository ConfPlantasClienteRepository => _confPlantasClienteRepository ?? new ConfPlantasClienteRepository(_context);

        public IParametrosElementoPlantaClienteRepository ParametrosElementoPlantaClienteRepository => _parametrosElementoPlantaClienteRepository ?? new ParametrosElementoPlantaClienteRepository(_context);

        public IParametrosAnalisisPlantaRepository ParametrosAnalisisPlantaRepository => _parametrosAnalisisPlantaRepository ?? new ParametrosAnalisisPlantaRepository(_context);

        public IAnalisisNivelesPlantasClienteRepository AnalisisNivelesPlantasClienteRepository => _analisisNivelesPlantasClienteRepository ?? new AnalisisNivelesPlantasClienteRepository(_context);
        public IClientesContactosRepository ClientesContactosRepository => _clientesContactosRepository ?? new ClientesContactosRepository(_context);

        public IRepository<OfertasClientes> OfertasClientesRepository => _ofertasClientesRepository ?? new BaseRepository<OfertasClientes>(_context);

        public IRepository<Productos> ProductosRepository => _productosRepository ?? new BaseRepository<Productos>(_context);
        public IRepository<OfertasProductos> OfertasProductosRepository => _ofertasProductosRepository ?? new BaseRepository<OfertasProductos>(_context);
        public IRepository<Consumos> ConsumosRepository => _consumosRepository ?? new BaseRepository<Consumos>(_context);
        public IValorParametrosRepository ValorParametrosRepository => _valorParametrosRepository ?? new ValorParametrosRepository(_context);
        public IRepository<Entregas> EntregasRepository => _entregasRepository ?? new BaseRepository<Entregas>(_context);
        public IRepository<Proveedores> ProveedoresRepository => _proveedoresRepository ?? new BaseRepository<Proveedores>(_context);
        public IRepository<ModoEnvio> ModoEnvioRepository => _modoEnvioRepository ?? new BaseRepository<ModoEnvio>(_context);
        public IRepository<Elementos> ElementosRepository => _elementosRepository ?? new BaseRepository<Elementos>(_context);
        public IRepository<Parametros> ParametrosRepository => _parametrosRepository ?? new BaseRepository<Parametros>(_context);
        public IFilesRepository FilesRepository => _elementosFiles ?? new FilesRepository(_context);
        public IRepository<Files> FilesRepository2 => _filesRepository ?? new BaseRepository<Files>(_context);
        
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
