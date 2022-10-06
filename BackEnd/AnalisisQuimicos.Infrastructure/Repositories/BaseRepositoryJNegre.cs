using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Infrastructure.Repositories
{
    public class BaseRepositoryJNegre<T> : IRepository<T> where T : BaseEntity
    {
        private readonly JNCT1Context _context;
        protected readonly DbSet<T> _entities;
        public BaseRepositoryJNegre(JNCT1Context context)
        {
            _context = context;
            _entities = context.Set<T>();
        }
        public IEnumerable<T> GetAll()
        {
            return _entities.AsEnumerable();
        }
        public async Task<T> GetById(int id)
        {
            return await _entities.FindAsync(id);
        }
        public async Task Add(T entity)
        {
            await _entities.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
        public async Task Delete(int id)
        {
            T entity = await GetById(id);
            _entities.Remove(entity);
            await _context.SaveChangesAsync();
        }
        public void Update(T entity)
        {
            _entities.Update(entity);
            _context.SaveChanges();
        }
    }
}
