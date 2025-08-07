using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Infrastructure.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AnalisisQuimicos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaArchivosController : ControllerBase
    {
        private readonly YucodeDevelopmentJNC_AQContext _db;

        public TareaArchivosController(YucodeDevelopmentJNC_AQContext db)
        {
            _db = db;
        }

        // GET: api/<ComentariosElementosController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpPost]
        public void Post([FromBody] TareaArchivos archivo)
        {
            _db.Add(archivo);
            _db.SaveChanges();
        }

        [HttpGet("{id}")]
        public IActionResult GetArchivoById(int id)
        {
            try
            {
                var archivo = _db.GesTareaArchivos.Where(x => x.Deleted != true).FirstOrDefault(c => c.Id == id);
                if (archivo == null)
                {
                    return NotFound();
                }

                return Ok(archivo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // GET api/<ComentariosElementosController>/5
        [HttpGet("GetArchivosByIdTarea/{idTarea}")]
        public IActionResult GetArchivosByIdTarea(int idTarea)
        {
            try
            {
                var archivo = (from arch in _db.GesTareaArchivos
                               where arch.IdTarea == idTarea
                               where arch.Deleted != true
                               select arch).ToList();

                if (archivo == null)
                {
                    return NotFound();
                }

                return Ok(archivo);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        // DELETE api/<ComentariosElementosController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var tarea = _db.GesTareaArchivos.FirstOrDefault(c => c.Id == id);
                if (tarea == null)
                {
                    return NotFound();
                }

                tarea.Deleted = true;
                _db.SaveChanges();

                return Ok(tarea);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
