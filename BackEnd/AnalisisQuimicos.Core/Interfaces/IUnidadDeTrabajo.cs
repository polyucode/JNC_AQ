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
        IRepository<ElementosPlanta> ElementosPlantaRepository { get; }

        void SaveChanges();

        Task SaveChangesAsync();
    }
}
