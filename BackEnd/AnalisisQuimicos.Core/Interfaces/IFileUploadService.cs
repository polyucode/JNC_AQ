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
        Task<int> UploadTask(IFormFile file, string mode, int id);
        Task<Files> Download(int id);
        Task<string> DownloadFolderSchema(string clientName, string clientCode, string clientOffer, string accionType);
        Task<bool> ChangeFolderName(string path, string oldName, string newName);
        Task<bool> CreateNewFolder(string path, string folderName);
        Task<bool> DeleteFolder(string path);
        Task<bool> DeleteFile(string path, string fileName);
        Task<bool> UploadFileByPath(string path, string fileName, IFormFile file);
    }
}
