using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Infrastructure.Repositories
{
    public class FilesRepository : IFilesRepository
    {

        private readonly YucodeDevelopmentJNC_AQContext _context;
        protected readonly DbSet<Files> _entities;

        public FilesRepository(YucodeDevelopmentJNC_AQContext context)
        {
            _context = context;
            _entities = context.Set<Files>();
        }

        public async Task<Files> Download(int id)
        {
            return await _entities.FindAsync(id);
        }

        public async Task<int> Upload(Files file)
        {
            await _entities.AddAsync(file);
            await _context.SaveChangesAsync();

            return file.Id;
        }

        public async Task<int> UploadTask(Files file)
        {
            await _entities.AddAsync(file);
            await _context.SaveChangesAsync();

            return file.Id;
        }
    }
}
