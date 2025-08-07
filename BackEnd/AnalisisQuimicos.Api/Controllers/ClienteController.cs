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
    public class ClienteController : ControllerBase
    {
        private readonly IClienteService _clienteService;
        private readonly IMapper _mapper;
        private readonly YucodeDevelopmentJNC_AQContext _db;

        public ClienteController(YucodeDevelopmentJNC_AQContext db, IClienteService clienteService, IMapper mapper)
        {
            _db = db;
            _clienteService = clienteService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var clientes = _clienteService.GetAll();
            var clientesDto = _mapper.Map<IEnumerable<ClienteDto>>(clientes);
            var response = new ApiResponses<IEnumerable<ClienteDto>>(clientesDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var cliente = await _clienteService.GetById(id);
            var clienteDto = _mapper.Map<ClienteDto>(cliente);
            var response = new ApiResponses<ClienteDto>(clienteDto);
            return Ok(response);
        }

        [HttpGet("codigo/{codigo}")]
        public IActionResult GetByCodigoCliente(int codigo)
        {
            var cliente = _clienteService.GetByCodigoCliente(codigo);
            var clienteDto = _mapper.Map<ClienteDto>(cliente);
            var response = new ApiResponses<ClienteDto>(clienteDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ClienteDto clienteDto)
        {
            var cliente = _mapper.Map<Clientes>(clienteDto);

            await _clienteService.Add(cliente);

            clienteDto = _mapper.Map<ClienteDto>(cliente);
            var response = new ApiResponses<ClienteDto>(clienteDto);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ClienteDto clienteDto)
        {
            var cliente = _mapper.Map<Clientes>(clienteDto);

            _clienteService.Update(cliente);

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var cl = _db.GesClientes.FirstOrDefault(c => c.Id == id && c.Deleted != true);
                if (cl == null)
                {
                    return NotFound();
                }

                cl.Deleted = true;

                var contactos = _db.GesClientesContactos.Where(o => o.CodigoCliente == cl.Codigo && o.Deleted != true).ToList();
                if (contactos != null)
                {
                    foreach (var cont in contactos)
                    {
                        cont.Deleted = true;
                    }
                }

                var of = _db.GesOfertasClientes.Where(o => o.CodigoCliente == cl.Codigo && o.Deleted != true).ToList();
                if(of != null)
                {
                    foreach (var oferta in of)
                    {
                        oferta.Deleted = true;
                    }
                }

                var planta = _db.GesConfPlantasCliente.Where(x => x.CodigoCliente == cl.Codigo && x.Deleted != true).ToList();
                if(planta != null)
                {
                    foreach (var pl in planta)
                    {
                        pl.Deleted = true;
                    }
                }

                var nivelesPlanta = _db.GesConfNivelesPlantasCliente.Where(x => x.CodigoCliente == cl.Codigo && x.Deleted != true).ToList();
                if (nivelesPlanta != null)
                {
                    foreach (var niv in nivelesPlanta)
                    {
                        niv.Deleted = true;
                    }
                }

                var nivelesPlantaIds = nivelesPlanta.Select(n => n.Id).ToList();
                var elementosIds = nivelesPlanta.Select(n => n.Id_Elemento).ToList();

                var analisisPlanta = _db.GesConfAnalisisNivelesPlantasCliente
                    .Where(x => nivelesPlantaIds.Contains(x.Id_NivelesPlanta) && x.Deleted != true)
                    .ToList();

                if (analisisPlanta != null)
                {
                    foreach (var an in analisisPlanta)
                    {
                        an.Deleted = true;
                    }
                }

                var ofertasIds = of.Select(n => n.Id).ToList();
                var ofertaNumeroIds = of.Select(n => n.NumeroOferta).ToList();

                var consumo = _db.GesConsumos.Where(x => ofertaNumeroIds.Contains(x.Oferta) && x.Deleted != true).ToList();
                if (consumo != null)
                {
                    foreach (var cons in consumo)
                    {
                        cons.Deleted = true;
                    }
                }

                var elementos = _db.GesElementosPlanta.Where(x => elementosIds.Contains(x.Id) && x.Deleted != true).ToList();
                if (elementos != null)
                {
                    foreach (var el in elementos)
                    {
                        el.Deleted = true;
                    }
                }

                var historialCorreo = _db.GesHistorialCorreosEnviados.Where(x => x.CodigoCliente == cl.Codigo && x.Deleted != true).ToList();
                if (historialCorreo != null)
                {
                    foreach (var his in historialCorreo)
                    {
                        his.Deleted = true;
                    }
                }

                var comentarios = _db.GesComentariosElementos.Where(x => elementosIds.Contains(x.IdElemento) && x.Deleted != true).ToList();
                if (comentarios != null)
                {
                    foreach (var com in comentarios)
                    {
                        com.Deleted = true;
                    }
                }

                var observaciones = _db.GesObservacionesElementos.Where(x => elementosIds.Contains(x.IdElemento) && x.Deleted != true).ToList();
                if (observaciones != null)
                {
                    foreach (var obs in observaciones)
                    {
                        obs.Deleted = true;
                    }
                }                

                var ofertaContacto = _db.GesOfertasContactos.Where(x => ofertasIds.Contains(x.IdOferta) && x.Deleted != true).ToList();
                if (ofertaContacto != null)
                {
                    foreach (var oferta in ofertaContacto)
                    {
                        oferta.Deleted = true;
                    }
                }

                var ofertaProducto = _db.GesOfertasProductos.Where(x => ofertasIds.Contains(x.IdOferta) && x.Deleted != true).ToList();
                if (ofertaProducto != null)
                {
                    foreach (var oferta in ofertaProducto)
                    {
                        oferta.Deleted = true;
                    }
                }

                var parametrosAnalisis = _db.GesParametrosAnalisisPlanta.Where(x => x.CodigoCliente == cl.Codigo && x.Deleted != true).ToList();
                if (parametrosAnalisis != null)
                {
                    foreach (var param in parametrosAnalisis)
                    {
                        param.Deleted = true;
                    }
                }

                var parametrosElemento = _db.GesParametrosElementoPlantaCliente.Where(x => x.CodigoCliente == cl.Codigo && x.Deleted != true).ToList();
                if (parametrosElemento != null)
                {
                    foreach (var param in parametrosElemento)
                    {
                        param.Deleted = true;
                    }
                }

                var tareas = _db.GesTareas.Where(x => x.CodigoCliente == cl.Codigo && x.Deleted != true).ToList();
                if (tareas != null)
                {
                    foreach (var tarea in tareas)
                    {
                        tarea.Deleted = true;
                    }
                }

                var tareasIds = tareas.Select(n => n.Id).ToList();

                var tareasArchivos = _db.GesTareaArchivos.Where(x => tareasIds.Contains(x.IdTarea) && x.Deleted != true).ToList();
                if (tareasArchivos != null)
                {
                    foreach (var tarea in tareasArchivos)
                    {
                        tarea.Deleted = true;
                    }
                }

                var archivosPdfIds = tareasArchivos.Select(n => n.IdFile).ToList();
                var archivosParamPdfIds = parametrosAnalisis.Select(n => n.Pdf).ToList();

                var archivos = _db.GesFiles.Where(x => archivosPdfIds.Contains(x.Id) || archivosParamPdfIds.Contains(x.Id)).ToList();
                if(archivos != null)
                {
                    foreach (var file in archivos)
                    {
                        file.Deleted = true;
                    }
                }

                var valorParametros = _db.GesValorParametros.Where(x => x.CodigoCliente == cl.Codigo && x.Deleted != true).ToList();
                if (valorParametros != null)
                {
                    foreach (var valor in valorParametros)
                    {
                        valor.Deleted = true;
                    }
                }

                _db.SaveChanges();

                return Ok(cl);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
