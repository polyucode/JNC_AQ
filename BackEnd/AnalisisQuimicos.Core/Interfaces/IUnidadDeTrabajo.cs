using AnalisisQuimicos.Core.Entities;
using System;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IUnidadDeTrabajo :IDisposable
    {
        IUsuarioRepository UsuarioRepository { get; }
        IRepository<Archivos> ArchivosRepository { get; }
        IRepository<Analisis> AnalisisRepository { get; }
        IRepository<Clientes> ClienteRepository { get; }
        IRepository<Perfiles> PerfilRepository { get; }
        IRepository<Tareas> TareasRepository { get; }
        IRepository<ServMantenimientoDet> ServMantenimientoDetRepository { get; }
        IRepository<Comarcas> ComarcaRepository { get; }
        IRepository<Provincias> ProvinciaRepository { get; }
        IRepository<Poblaciones> PoblacionRepository { get; }
        IRepository<ElementosPlanta> ElementosPlantaRepository { get; }
        IConfNivelesPlantasClienteRepository ConfNivelesPlantasClienteRepository { get; }
        IConfPlantasClienteRepository ConfPlantasClienteRepository { get; }
        IParametrosElementoPlantaClienteRepository ParametrosElementoPlantaClienteRepository { get; }
        IRepository<ParametrosAnalisisPlanta> ParametrosAnalisisPlantaRepository { get; }
        IAnalisisNivelesPlantasClienteRepository AnalisisNivelesPlantasClienteRepository { get; }
        IRepository<ClientesContactos> ClientesContactosRepository { get; }
        IRepository<OfertasClientes> OfertasClientesRepository { get; }
        IRepository<Productos> ProductosRepository { get; }
        IRepository<OfertasProductos> OfertasProductosRepository { get; }
        IRepository<Consumos> ConsumosRepository { get; }
        IValorParametrosRepository ValorParametrosRepository { get; }
        IRepository<Entregas> EntregasRepository { get; }
        IRepository<Proveedores> ProveedoresRepository { get; }
        IRepository<ModoEnvio>ModoEnvioRepository { get; }
        IRepository<Elementos> ElementosRepository { get; }

        void SaveChanges();

        Task SaveChangesAsync();
    }
}
