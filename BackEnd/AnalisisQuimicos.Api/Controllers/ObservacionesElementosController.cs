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
    public class ObservacionesElementosController : ControllerBase
    {
        private readonly YucodeDevelopmentJNC_AQContext _db;

        public ObservacionesElementosController(YucodeDevelopmentJNC_AQContext db)
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
        public IActionResult GetObservacionById(int id)
        {
            try
            {
                var observacion = _db.GesObservacionesElementos.FirstOrDefault(c => c.Id == id);
                if (observacion == null)
                {
                    return NotFound();
                }

                return Ok(observacion);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpGet("GetByElementoId/{elementoId}")]
        public IEnumerable<ObservacionesElementos> GetByElementoId(int elementoId)
        {
            try
            {
                var comentarios = (from logs in _db.GesObservacionesElementos
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
        public void Post([FromBody] ObservacionesElementos observacion)
        {
            observacion.Fecha = DateTime.Now;
            _db.Add(observacion);
            _db.SaveChanges();
        }

        // PUT api/<ComentariosElementosController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ObservacionesElementos observacion)
        {
            try
            {
                var obs = _db.GesObservacionesElementos.FirstOrDefault(c => c.Id == id);
                if (obs == null)
                {
                    return NotFound();
                }

                obs.Fecha = DateTime.Now;
                obs.Observacion = observacion.Observacion;
                obs.VerCliente = observacion.VerCliente;
                obs.VerInsp = observacion.VerInsp;
                _db.SaveChanges();

                return Ok(obs);
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
                var obs = _db.GesObservacionesElementos.FirstOrDefault(c => c.Id == id);
                if (obs == null)
                {
                    return NotFound();
                }

                obs.Deleted = true;
                _db.SaveChanges();

                return Ok(obs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
