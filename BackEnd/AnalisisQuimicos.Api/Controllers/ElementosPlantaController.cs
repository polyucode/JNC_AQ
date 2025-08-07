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
    public class ElementosPlantaController : ControllerBase
    {
        private readonly IRepository<ElementosPlanta> _clienteService;
        private readonly IMapper _mapper;
        private readonly IElementosPlantaExtra _elementosPlantaExtraService;
        private readonly YucodeDevelopmentJNC_AQContext _db;


        public ElementosPlantaController(YucodeDevelopmentJNC_AQContext db, IRepository<ElementosPlanta> clienteServicey, IMapper mapper, IElementosPlantaExtra elementosPlantaExtra)
        {
            _db = db;
            _clienteService = clienteServicey;
            _mapper = mapper;
            _elementosPlantaExtraService = elementosPlantaExtra;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var clientes = _clienteService.GetAll();
            var clientesDto = _mapper.Map<IEnumerable<ElementosPlantaDto>>(clientes);
            var response = new ApiResponses<IEnumerable<ElementosPlantaDto>>(clientesDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var cliente = await _clienteService.GetById(id);
            var clienteDto = _mapper.Map<ElementosPlantaDto>(cliente);
            var response = new ApiResponses<ElementosPlantaDto>(clienteDto);
            return Ok(response);
        }

        [HttpGet("GetIconoElemento")]
        public async Task<IActionResult> GetIconoElemento(int idElemento)

        {
            var response = await _elementosPlantaExtraService.GetIconoElementoPlanta(idElemento); 
            return Ok(response);
        }

        [HttpPost("subirIconoElementoPlanta")]
        public async Task<IActionResult> SubirIconoElementoPlanta(int idElemento, IFormFile file)
        {
            //var cliente = _mapper.Map<ElementosPlanta>(clienteDto);

            //await _clienteService.Add(cliente);

            //clienteDto = _mapper.Map<ElementosPlantaDto>(cliente);
            //var response = new ApiResponses<ElementosPlantaDto>(clienteDto);
            var name = await _elementosPlantaExtraService.SubirIconoElemento(idElemento, file);
            return Ok(name);
        }

        [HttpPost("eliminarIconoElementoPlanta")]
        public async Task<IActionResult> EliminarIconoElementoPlanta(int idElemento)
        {
            _elementosPlantaExtraService.EliminarIconoElementoPlanta(idElemento);
            return Ok(true);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ElementosPlantaDto clienteDto)
        {
            var cliente = _mapper.Map<ElementosPlanta>(clienteDto);

            await _clienteService.Add(cliente);

            clienteDto = _mapper.Map<ElementosPlantaDto>(cliente);
            var response = new ApiResponses<ElementosPlantaDto>(clienteDto);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ElementosPlantaDto clienteDto)
        {
            var cliente = _mapper.Map<ElementosPlanta>(clienteDto);

            _clienteService.Update(cliente);

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var elemento = _db.GesElementosPlanta.FirstOrDefault(x => x.Id == id && x.Deleted != true);
                if (elemento == null)
                {
                    return NotFound();
                }

                elemento.Deleted = true;

                var tareas = _db.GesTareas.Where(o => o.Elemento == id && o.Deleted != true).ToList();
                if (tareas != null)
                {
                    foreach (var tarea in tareas)
                    {
                        var tareaArchivo = _db.GesTareaArchivos.Where(x => x.IdTarea == tarea.Id && x.Deleted != true).ToList();
                        foreach(var arch in tareaArchivo)
                        {
                            arch.Deleted = true;
                        }

                        tarea.Deleted = true;
                    }
                }

                var parametrosAnalisis = _db.GesParametrosAnalisisPlanta.Where(x => x.Elemento == id && x.Deleted != true).ToList();
                if (parametrosAnalisis != null)
                {
                    foreach (var param in parametrosAnalisis)
                    {
                        var archivo = _db.GesFiles.Where(x => x.idTareaAnalisis == param.Id).ToList();
                        foreach(var arch in archivo)
                        {
                            arch.Deleted = true;
                        }

                        param.Deleted = true;
                    }
                }

                var parametrosElementoAnalisis = _db.GesParametrosElementoPlantaCliente.Where(x => x.Id_Elemento == id && x.Deleted != true).ToList();
                if (parametrosElementoAnalisis != null)
                {
                    foreach (var param in parametrosElementoAnalisis)
                    {
                        param.Deleted = true;
                    }
                }

                var valorParametros = _db.GesValorParametros.Where(x => x.Id_Elemento == id && x.Deleted != true).ToList();
                if (valorParametros != null)
                {
                    foreach (var param in valorParametros)
                    {
                        param.Deleted = true;
                    }
                }

                var nivelesPlanta = _db.GesConfNivelesPlantasCliente.Where(o => o.Id_Elemento == id && o.Deleted != true).FirstOrDefault();
                if (nivelesPlanta != null)
                {
                    nivelesPlanta.Deleted = true;
                }

                var analisisPlanta = _db.GesConfAnalisisNivelesPlantasCliente.Where(o => o.Id_NivelesPlanta == nivelesPlanta.Id && o.Deleted != true).ToList();
                if (analisisPlanta != null)
                {
                    foreach (var analisi in analisisPlanta)
                    {
                        analisi.Deleted = true;
                    }
                }

                var observaciones = _db.GesObservacionesElementos.Where(x => x.IdElemento == id && x.Deleted != true).ToList();
                if (observaciones != null)
                {
                    foreach(var obs in observaciones)
                    {
                        obs.Deleted = true;
                    }
                }

                var comentarios = _db.GesComentariosElementos.Where(x => x.IdElemento == id && x.Deleted != true).ToList();
                if (comentarios != null)
                {
                    foreach (var com in comentarios)
                    {
                        com.Deleted = true;
                    }
                }

                _db.SaveChanges();

                return Ok(elemento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
