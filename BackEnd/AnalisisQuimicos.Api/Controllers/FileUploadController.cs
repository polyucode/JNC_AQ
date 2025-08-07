using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Infrastructure.Data;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private readonly IFileUploadService _fileUpload;
        private readonly IMapper _mapper;
        private readonly IHistorialCorreosContactosService _historialCorreos;

        public FileUploadController(IFileUploadService fileUpload, IMapper mapper, IHistorialCorreosContactosService historialCorreos)
        {
            _fileUpload = fileUpload;
            _mapper = mapper;
            _historialCorreos = historialCorreos;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Get file");
        }

        [HttpPost("upload/{mode}/{id}")]
        public async Task<IActionResult> Upload(IFormFile file, string mode, int id)
        {
            try
            {               
                return Ok(await _fileUpload.Upload(file, mode, id));
            }
            catch (Exception e)
            {
                return Ok(e.InnerException.Message);
            }
        }

        [HttpPost("uploadFiles/{mode}/{id}")]
        public async Task<IActionResult> UploadFiles(IFormFile file, string mode, int id)
        {
            try
            {
                return Ok(await _fileUpload.UploadFiles(file, mode, id));
            }
            catch (Exception e)
            {
                return Ok(e.InnerException.Message);
            }
        }

        [HttpPost("uploadTask/{mode}/{id}")]
        public async Task<IActionResult> UploadTask(IFormFile file, string mode, int id)
        {
            try
            {
                return Ok(await _fileUpload.UploadTask(file, mode, id));
            }
            catch (Exception e)
            {
                return Ok(e.InnerException.Message);
            }
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmailNoFQ(int codigo, string texto, int analisis, IFormFile file, string contactos, int idElemento)
        {
            try
            {
                return Ok(await _fileUpload.SendEmailToClientNoFQ(codigo, file, texto, analisis, contactos, idElemento));
            }
            catch (Exception e)
            {
                return Ok(e.InnerException.Message);
            }
        }

        //[HttpPost("send/{codigo}/{texto}/{analisis}")]
        //public async Task<IActionResult> SendEmailNoFQ(IFormFile file, int codigo, string texto, int analisis)
        //{
        //    try
        //    {
        //        return Ok(await _fileUpload.SendEmailToClientNoFQ(codigo, file, texto, analisis));
        //    }
        //    catch (Exception e)
        //    {
        //        return Ok(e.InnerException.Message);
        //    }
        //}

        [HttpGet("download/{id}")]
        public async Task<IActionResult> Download(int id)
        {
            Files download = _fileUpload.Download(id).Result;
            FileContentResult _fileContent;

            try
            {
                // Descargamos el archivo del Servidor.
                _fileContent = new FileContentResult(System.IO.File.ReadAllBytes(download.Path), "application/octet-stream");
                _fileContent.FileDownloadName = download.Name + "." + download.Format;

                return _fileContent;
            }
            catch (Exception ex)
            {
                return Ok($"Error al descargar el archivo: {ex.Message}");
            }
        }

        [HttpGet("DownloadFolderSchema/{nombreCliente}/{codigoCliente}/{codigoOferta}/{tipoAccion}")]
        public async Task<IActionResult> DownloadFolderSchema(string nombreCliente, string codigoCliente, string codigoOferta, string tipoAccion)
        {
            string json = await _fileUpload.DownloadFolderSchema(nombreCliente, codigoCliente, codigoOferta, tipoAccion);
            return Ok(json);
        }

        [HttpPost("ChangeFolderName/{path}/{oldName}/{newName}")]
        public async Task<IActionResult> ChangeFolderName(string path, string oldName, string newName)
        {
            bool json = await _fileUpload.ChangeFolderName(path, oldName, newName);
            return Ok("");
        }

        [HttpPost("CreateNewFolder/{path}/{folderName}")]
        public async Task<IActionResult> CreateNewFolder(string path, string folderName)
        {
            //bool json = await _fileUpload.ChangeFolderName(path, oldName, newName);
            bool json = await _fileUpload.CreateNewFolder(path, folderName);
            return Ok("");
        }

        [HttpPost("DeleteFolder/{path}")]
        public async Task<IActionResult> DeleteFolder(string path, string folderName)
        {
            //bool json = await _fileUpload.ChangeFolderName(path, oldName, newName);
            bool json = await _fileUpload.DeleteFolder(path);
            return Ok("");
        }

        [HttpPost("DeleteFile/{path}/{fileName}")]
        public async Task<IActionResult> DeleteFile(string path, string fileName)
        {
            //bool json = await _fileUpload.ChangeFolderName(path, oldName, newName);
            bool json = await _fileUpload.DeleteFile(path, fileName);
            return Ok("");
        }

        [HttpPost("UploadFile/{path}/{fileName}")]
        public async Task<IActionResult> UploadFile(string path, string fileName, IFormFile file)
        {
            bool respuesta = await _fileUpload.UploadFileByPath(path, fileName, file);
            return Ok("");
        }

        [HttpGet("DownloadFileByPath/{path}/{fileName}")]
        public async Task<IActionResult> DownloadFileByPath(string path, string fileName)
        {
            try
            {
                FileContentResult _fileContent;
                string finalPath = Path.Combine(path, fileName);
                try
                {
                    // Descargamos el archivo del Servidor.
                    _fileContent = new FileContentResult(System.IO.File.ReadAllBytes(finalPath), "application/octet-stream");
                    _fileContent.FileDownloadName = fileName;

                    return _fileContent;
                }
                catch (Exception ex)
                {
                    return Ok($"Error al descargar el archivo: {ex.Message}");
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
