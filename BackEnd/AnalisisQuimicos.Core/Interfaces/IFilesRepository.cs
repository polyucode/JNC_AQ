using AnalisisQuimicos.Core.Entities;
using Microsoft.AspNetCore.Http;
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

        Task<int> UploadTask(Files file);

        Task<string> DownloadFolderSchema(string clientName, string clientCode, string clientOffer, string accionType);

        Task<bool> ChangeFolderName(string path, string oldName, string newName);

        Task<bool> CreateNewFolder(string path, string folderName);

        Task<bool> DeleteFolder(string path);
        Task<bool> DeleteFile(string path, string fileName);
        Task<bool> UploadFileByPath(string path, string fileName, IFormFile file);

        //IEnumerable<Files> GetAll();

        //Task<Files> GetById(int id);
    }
}
