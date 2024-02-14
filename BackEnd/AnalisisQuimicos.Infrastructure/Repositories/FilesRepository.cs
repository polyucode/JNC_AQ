using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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

        public async Task<string> DownloadFolderSchema(string clientName, string clientCode, string clientOffer, string accionType)
        {
            try
            {
                //TODO: Mirar en un futuro de estandarizar las estructuras de ficheros
                accionType = accionType.Replace(" ", "_");
                string rutaFinal = Path.Combine(Environment.CurrentDirectory, "Pdf", clientName, clientOffer, "Planta_1", accionType);
                //string rutaFinal = Path.Combine(Environment.CurrentDirectory, "Pdf",clientName, clientOffer);
                if (!Directory.Exists(rutaFinal))
                {
                    return "";
                }
                EstructuraCarpetasJson carpetaMain = new EstructuraCarpetasJson { nombre = "", ruta = rutaFinal, ficheros = null, subCarpetas = new List<EstructuraCarpetasJson>() };

                MontarSubcarpetas(ref carpetaMain);

                JObject json = new JObject(JObject.FromObject(carpetaMain));
                string jsonString = json.ToString();
                return jsonString;
            }
            catch (Exception ex)
            {

                return "";
            }
        }

        private void MontarSubcarpetas(ref EstructuraCarpetasJson carpeta)
        {
            carpeta.nombre = carpeta.ruta.Split("\\")[carpeta.ruta.Split("\\").Length - 1];
            //La ruta se la paso antes de entrar en la funcion
            List<string> listaFicherosAux = Directory.GetFiles(carpeta.ruta).ToList();
            List<string> listaFicherosAux2 = new List<string>();
            foreach (string fichero in listaFicherosAux)
            {
                listaFicherosAux2.Add(fichero.Split("\\")[fichero.Split("\\").Length - 1]);
            }
            carpeta.ficheros = listaFicherosAux2.ToArray();
            string[] nombreSubCarpetas = Directory.GetDirectories(carpeta.ruta);
            foreach (string subCarpeta in nombreSubCarpetas)
            {
                carpeta.subCarpetas.Add(new EstructuraCarpetasJson() { nombre = "", ruta = subCarpeta, ficheros = null, subCarpetas = new List<EstructuraCarpetasJson>() });
            }
            for (int i = 0; i < carpeta.subCarpetas.Count; i++)
            {
                EstructuraCarpetasJson carpetaAux = carpeta.subCarpetas[i];
                MontarSubcarpetas(ref carpetaAux);
            }

        }

        public async Task<bool> ChangeFolderName(string path, string oldName, string newName)
        {
            try
            {
                int characters = oldName.Length;
                string newPath = Path.Combine(path.Substring(0, path.Length - characters), newName);
                Directory.Move(path, newPath);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> CreateNewFolder(string path, string folderName)
        {
            try
            {
                Directory.CreateDirectory(Path.Combine(path, folderName));

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> DeleteFolder(string path)
        {
            try
            {
                Directory.Delete(path, true);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> DeleteFile(string path, string fileName)
        {
            try
            {
                string finalPath = Path.Combine(path, fileName);
                File.Delete(finalPath);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> UploadFileByPath(string path, string fileName, IFormFile file)
        {
            try
            {
                if (!Directory.Exists(path))
                {
                    return false;
                }
                string totalPath = Path.Combine(path, fileName);
                using (Stream fileStream = new FileStream(totalPath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                    fileStream.Close();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }

    public class EstructuraCarpetasJson
    {
        public string nombre;
        public string ruta;
        public string[] ficheros;
        public List<EstructuraCarpetasJson> subCarpetas;
    }
}
