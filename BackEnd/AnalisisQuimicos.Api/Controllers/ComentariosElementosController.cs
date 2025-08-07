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
    public class ComentariosElementosController : ControllerBase
    {
        private readonly YucodeDevelopmentJNC_AQContext _db;

        public ComentariosElementosController(YucodeDevelopmentJNC_AQContext db)
        {
            _db = db;
        }

        // GET: api/<ComentariosElementosController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ComentariosElementosController>/5
        [HttpGet("{id}")]
        public IActionResult GetComentarioById(int id)
        {
            try
            {
                var comentario = _db.GesComentariosElementos.FirstOrDefault(c => c.Id == id);
                if (comentario == null)
                {
                    return NotFound();
                }

                return Ok(comentario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpGet("GetByTareaId/{tareaId}")]
        public IEnumerable<ComentariosElementos> GetByTareaId(int tareaId)
        {
            try
            {
                var comentarios = (from logs in _db.GesComentariosElementos
                                   where logs.IdTarea == tareaId
                                   where logs.Deleted != true
                                   orderby logs.Fecha descending
                                   select logs).ToList();
                return comentarios;
            }
            catch (Exception ex)
            {
                return null;
            }

            //return _comentariosService.GetComentariosByIdElemento(elementoId);
        }

        [HttpGet("GetByElementoId/{elementoId}")]
        public IEnumerable<ComentariosElementos> GetByElementoId(int elementoId)
        {
            try
            {
                var comentarios = (from logs in _db.GesComentariosElementos
                                   where logs.IdElemento == elementoId
                                   where logs.Deleted != true
                                   orderby logs.Fecha descending
                                   select logs).ToList();
                return comentarios;
            }
            catch (Exception ex)
            {
                return null;
            }

            //return _comentariosService.GetComentariosByIdElemento(elementoId);
        }

        // POST api/<ComentariosElementosController>
        [HttpPost]
        public void Post([FromBody] ComentariosElementos comentario)
        {
            comentario.Fecha = DateTime.Now;
            _db.Add(comentario);
            _db.SaveChanges();
        }

        // PUT api/<ComentariosElementosController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ComentariosElementos comentario)
        {
            try
            {
                var comen = _db.GesComentariosElementos.FirstOrDefault(c => c.Id == id);
                if (comen == null)
                {
                    return NotFound();
                }

                comen.Comentario = comentario.Comentario;
                _db.SaveChanges();

                return Ok(comen);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // DELETE api/<ComentariosElementosController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var comentario = _db.GesComentariosElementos.FirstOrDefault(c => c.Id == id);
                if (comentario == null)
                {
                    return NotFound();
                }

                comentario.Deleted = true;
                _db.SaveChanges();

                return Ok(comentario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
