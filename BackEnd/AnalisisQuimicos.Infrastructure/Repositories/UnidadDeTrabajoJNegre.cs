using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Infrastructure.Repositories
{
    public class UnidadDeTrabajoJNegre : IUnidadDeTrabajoJNegre
    {
        private readonly JNCT1Context _context;
        //private readonly IRepository<FechasTrabajo> _fechatrabajoRepository;
        public UnidadDeTrabajoJNegre(JNCT1Context context)
        {
            _context = context;
        }
        //public IRepository<FechasTrabajo> FechasTrabajoRepository => _fechatrabajoRepository ?? new BaseRepositoryOldJNegre<FechasTrabajo>(_context);
        public void Dispose()
        {
            if (_context != null)
            {
                _context.Dispose();
            }
        }
        public void SaveChanges()
        {
            _context.SaveChanges();
        }
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
