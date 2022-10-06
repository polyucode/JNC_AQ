using AnalisisQuimicos.Api.Responses;
using AnalisisQuimicos.Core.DTOs;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Infrastructure.Data;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Api.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ArchivosController : ControllerBase
    {

        public readonly YucodeDevelopmentJNC_AQContext context;
        public ArchivosController(YucodeDevelopmentJNC_AQContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.GesArchivos.ToList());
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult PostArchivos([FromForm] List<IFormFile> files)
        {
            List<Archivos> archivos = new List<Archivos>();
            try
            {
                if(files.Count > 0)
                {
                    foreach (var file in files)
                    {
                        var filePath = "C:\\Users\\chris\\Desktop\\Proyecto Yucode\\JNC_AQ\\FrontEnd\\src\\files\\"+file.FileName;
                        using(var stream = System.IO.File.Create(filePath))
                        {
                            file.CopyToAsync(stream);
                        }
                        double tamaño = file.Length;
                        tamaño = tamaño / 1000000;
                        tamaño = Math.Round(tamaño, 2);
                        Archivos archivo = new Archivos();
                        archivo.Extension = Path.GetExtension(file.FileName).Substring(1);
                        archivo.Nombre = Path.GetFileNameWithoutExtension(file.FileName);
                        archivo.Tamaño = tamaño;
                        archivo.Ubicacion = filePath;
                        archivos.Add(archivo);
                    }
                    context.GesArchivos.AddRange(archivos);
                    context.SaveChanges();
                }

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(archivos);
        }
    }
}
