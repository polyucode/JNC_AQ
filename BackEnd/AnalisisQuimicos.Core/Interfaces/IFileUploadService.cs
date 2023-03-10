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
        Task<bool> Upload(IFormFile file, int id);
        Task<Files> Download(int id);
    }
}
