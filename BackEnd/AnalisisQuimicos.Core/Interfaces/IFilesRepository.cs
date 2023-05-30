using AnalisisQuimicos.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IFilesRepository
    {
        Task<Files> Download(int id);

        Task<int> Upload(Files file);

        //IEnumerable<Files> GetAll();

        //Task<Files> GetById(int id);
    }
}
