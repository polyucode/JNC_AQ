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
    public class ElementosPlantaService : IRepository<ElementosPlanta>, IElementosPlantaExtra
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public ElementosPlantaService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task Delete(int id)
        {
            await _unidadDeTrabajo.ElementosPlantaRepository.Delete(id);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<ElementosPlanta> GetById(int id)
        {
            return await _unidadDeTrabajo.ElementosPlantaRepository.GetById(id);
        }

        public IEnumerable<ElementosPlanta> GetAll() //ElementosPlantaQueryFilter filtro
        {
            var clientes = _unidadDeTrabajo.ElementosPlantaRepository.GetAll();
            return clientes;
        }

        public async Task Add(ElementosPlanta cliente)
        {
            await _unidadDeTrabajo.ElementosPlantaRepository.Add(cliente);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async void Update(ElementosPlanta cliente)
        {
            _unidadDeTrabajo.ElementosPlantaRepository.Update(cliente);
            await _unidadDeTrabajo.SaveChangesAsync();
        }

        public async Task<string> GetIconoElementoPlanta(int idElemento)
        {
            try
            {
                string workingDirectory = Environment.CurrentDirectory;
                string path = Path.Combine(workingDirectory, "IconosElementos");
                var elemento = await _unidadDeTrabajo.ElementosPlantaRepository.GetById(idElemento);
                if (elemento == null)
                {
                    return "";
                }
                if (elemento.NombreIcono == null)
                {
                    return "";
                }
                var archivo = Directory.GetFiles(path, $"{elemento.NombreIcono}*");
                if (archivo.Length == 0)
                {
                    return "";
                }
                else
                {
                    byte[] imageArray = File.ReadAllBytes(archivo[0]);
                    string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                    return base64ImageRepresentation;
                }

            }
            catch (Exception)
            {
                return "";
            }
        }

        public async Task<string> SubirIconoElemento(int idElemento, IFormFile file)
        {
            if (file == null)
            {
                return "";
            }

            BorrarIconoEnCasoSiExisteUnoAsignado(idElemento);

            string workingDirectory = Environment.CurrentDirectory;

            string path = Path.Combine(workingDirectory, "IconosElementos");

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            string existingFilePath = Path.Combine(path, file.FileName);

            if (!System.IO.File.Exists(existingFilePath))
            {
                using (var fileStream = new FileStream(existingFilePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }
            // Si ya existe, simplemente devuelves el nombre
            return file.FileName;
        }

        private bool BorrarIconoEnCasoSiExisteUnoAsignado(int idElemento)
        {
            string workingDirectory = Environment.CurrentDirectory;
            string path = Path.Combine(workingDirectory, "IconosElementos");
            var archivo = Directory.GetFiles(path, $"{idElemento}*");
            if (archivo.Length > 0)
            {
                File.Delete(archivo[0]);
            }
            return true;
        }

        public void EliminarIconoElementoPlanta(int idElemento)
        {
            BorrarIconoEnCasoSiExisteUnoAsignado(idElemento);
        }
    }
}
