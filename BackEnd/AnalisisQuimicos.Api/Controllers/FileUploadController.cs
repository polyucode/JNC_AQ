using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
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


        public FileUploadController(IFileUploadService fileUpload, IMapper mapper)
        {
            _fileUpload = fileUpload;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Get file");
        }

        [HttpPost("upload/{id}")]
        public async Task<IActionResult> Upload(IFormFile file, int id)
        {
            try
            {
                await _fileUpload.Upload(file, id);
                return Ok("Archivo subido");
            }
            catch (Exception e)
            {
                return Ok(e.InnerException.Message);
            }
        }


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
            catch
            {
                return Ok("NO SE A DESCARGADO");
            }
        }
    }
}
