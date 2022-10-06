using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IUnidadDeTrabajoJNegre : IDisposable
    {
        //IRepository<FechasTrabajo> FechasTrabajoRepository { get; }
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
