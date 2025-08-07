using AnalisisQuimicos.Api.Responses;
using AnalisisQuimicos.Core.DTOs;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Infrastructure.Data;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Api.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TareasController : ControllerBase
    {
        private readonly IRepository<Tareas> _tareasService;
        private readonly IRepository<ParametrosAnalisisPlanta> _parametrosAnalisisPlantaService;
        private readonly YucodeDevelopmentJNC_AQContext _db;
        private readonly IMapper _mapper;


        public TareasController(YucodeDevelopmentJNC_AQContext db, IRepository<Tareas> tareasServicey, IMapper mapper)
        {
            _db = db;
            _tareasService = tareasServicey;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var tareas = _tareasService.GetAll();
            var tareasDto = _mapper.Map<IEnumerable<TareasDTO>>(tareas);
            var response = new ApiResponses<IEnumerable<TareasDTO>>(tareasDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var tareas = await _tareasService.GetById(id);
            var tareasDto = _mapper.Map<TareasDTO>(tareas);
            var response = new ApiResponses<TareasDTO>(tareasDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(TareasDTO tareasDto)
        {
            var tareas = _mapper.Map<Tareas>(tareasDto);

            await _tareasService.Add(tareas);

            tareasDto = _mapper.Map<TareasDTO>(tareas);
            var response = new ApiResponses<TareasDTO>(tareasDto);

            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, TareasDTO tareasDto)
        {
            var tareas = _mapper.Map<Tareas>(tareasDto);

            _tareasService.Update(tareas);

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var tarea = _db.GesTareas.FirstOrDefault(x => x.Id == id && x.Deleted != true);
                if (tarea == null)
                {
                    return NotFound();
                }

                tarea.Deleted = true;

                var parametrosAnalisis = _db.GesParametrosAnalisisPlanta.Where(o => o.CodigoCliente == tarea.CodigoCliente && o.Oferta == tarea.Oferta && o.Elemento == tarea.Elemento && o.Analisis == tarea.Analisis && o.Deleted != true).ToList();
                if (parametrosAnalisis != null)
                {
                    foreach (var param in parametrosAnalisis)
                    {
                        param.Deleted = true;
                    }
                }

                var parametrosElemento = _db.GesParametrosElementoPlantaCliente.Where(o => o.CodigoCliente == tarea.CodigoCliente && o.Oferta == tarea.Oferta && o.Id_Elemento == tarea.Elemento && o.Id_Analisis == tarea.Analisis && o.Deleted != true).ToList();
                if (parametrosElemento != null)
                {
                    foreach (var param in parametrosElemento)
                    {
                        param.Deleted = true;
                    }
                }

                var valores = _db.GesValorParametros.Where(o => o.CodigoCliente == tarea.CodigoCliente && o.Oferta == tarea.Oferta && o.Id_Elemento == tarea.Elemento && o.Id_Analisis == tarea.Analisis && o.Deleted != true).ToList();
                if (valores != null)
                {
                    foreach (var valor in valores)
                    {
                        valor.Deleted = true;
                    }
                }

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
