using AnalisisQuimicos.Core.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IFileUploadService
    {
        Task<int> Upload(IFormFile file, string mode, int id);
        Task<Files> Download(int id);
    }
}
