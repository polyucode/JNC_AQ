using AnalisisQuimicos.Core.Entities;
using System;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IUnidadDeTrabajo :IDisposable
    {
        IUsuarioRepository UsuarioRepository { get; }
        IRepository<Clientes> ClienteRepository { get; }
        IRepository<Perfiles> PerfilRepository { get; }
        IRepository<ServMantenimientoCab> ServMantenimientoCabRepository { get; }
        IRepository<ServMantenimientoDet> ServMantenimientoDetRepository { get; }
        IRepository<Comarcas> ComarcaRepository { get; }
        IRepository<Provincias> ProvinciaRepository { get; }
        IRepository<Poblaciones> PoblacionRepository { get; }
        IRepository<ElementosPlanta> ElementosPlantaRepository { get; }
        IRepository<ConfNivelesPlantasCliente> ConfNivelesPlantasClienteRepository { get; }
        IRepository<ConfPlantasCliente> ConfPlantasClienteRepository { get; }
        IRepository<ParametrosElementoPlantaCliente> ParametrosElementoPlantaClienteRepository { get; }
        IRepository<AnalisisNivelesPlantasCliente> AnalisisNivelesPlantasClienteRepository { get; }
        IRepository<ClientesContactos> ClientesContactosRepository { get; }
        IRepository<OfertasClientes> OfertasClientesRepository { get; }
        IRepository<Productos> ProductosRepository { get; }
        IRepository<Consumos> ConsumosRepository { get; }

        void SaveChanges();

        Task SaveChangesAsync();
    }
}
