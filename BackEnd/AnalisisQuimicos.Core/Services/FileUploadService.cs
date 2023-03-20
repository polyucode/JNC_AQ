using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class FileUploadService : IFileUploadService
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public FileUploadService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task<bool> Upload(IFormFile file, string mode, int id)
        {
            string workingDirectory = Environment.CurrentDirectory;

            string path = Path.Combine(workingDirectory, "Archivos");

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            path = Path.Combine(path, file.FileName);

            using (Stream fileStream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
                fileStream.Close();
            }

            int indiceDelUltimoPunto = file.FileName.LastIndexOf('.');

            string _nombre = file.FileName.Substring(0, indiceDelUltimoPunto);
            string _extension = file.FileName.Substring(indiceDelUltimoPunto + 1, file.FileName.Length - indiceDelUltimoPunto - 1);

            Files newFile = new Files()
            {
                Name = _nombre,
                Format = _extension,
                Path = path
            };

            try
            {
                await _unidadDeTrabajo.FilesRepository.Upload(newFile);

                switch (mode)
                {
                    case "pdf":

                        ParametrosAnalisisPlanta parametros = _unidadDeTrabajo.ParametrosAnalisisPlantaRepository.GetById(id).Result;

                        parametros.Pdf = newFile.Id;

                        _unidadDeTrabajo.ParametrosAnalisisPlantaRepository.Update(parametros);

                        break;
                    case "firma":

                        Usuarios usuarios = _unidadDeTrabajo.UsuarioRepository.GetById(id).Result;

                        usuarios.Firma = newFile.Id;

                        _unidadDeTrabajo.UsuarioRepository.Update(usuarios);

                        break;
                }

                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<Files> Download(int id)
        {
            return await _unidadDeTrabajo.FilesRepository.Download(id);
        }
    }
}
