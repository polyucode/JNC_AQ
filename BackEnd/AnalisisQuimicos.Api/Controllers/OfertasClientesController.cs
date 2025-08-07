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
    public class OfertasClientesController : ControllerBase
    {
        private readonly IRepository<OfertasClientes> _ofertasClientesService;
        private readonly IMapper _mapper;
        private readonly YucodeDevelopmentJNC_AQContext _db;

        public OfertasClientesController(YucodeDevelopmentJNC_AQContext db, IRepository<OfertasClientes> ofertasClientesService, IMapper mapper)
        {
            _ofertasClientesService = ofertasClientesService;
            _mapper = mapper;
            _db = db;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var ofertas = _ofertasClientesService.GetAll();
            var ofertasDto = _mapper.Map<IEnumerable<OfertasClientesDTO>>(ofertas);
            var response = new ApiResponses<IEnumerable<OfertasClientesDTO>>(ofertasDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var oferta = await _ofertasClientesService.GetById(id);
            var OfertasClientesDTO = _mapper.Map<OfertasClientesDTO>(oferta);
            var response = new ApiResponses<OfertasClientesDTO>(OfertasClientesDTO);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(OfertasClientesDTO OfertasClientesDTO)
        {
            var oferta = _mapper.Map<OfertasClientes>(OfertasClientesDTO);
            await _ofertasClientesService.Add(oferta);

            OfertasClientesDTO = _mapper.Map<OfertasClientesDTO>(oferta);
            var response = new ApiResponses<OfertasClientesDTO>(OfertasClientesDTO);
            return Ok(response);
        }

        //[HttpPost("clone/{id}/{newOferta}")]
        //public IActionResult Clone(int id, int newOferta)
        //{
        //    try
        //    {
        //        // 1. Buscar la oferta original
        //        var originalOferta = _db.GesOfertasClientes.FirstOrDefault(x => x.Id == id && x.Deleted != true);
        //        if (originalOferta == null)
        //        {
        //            return NotFound("Oferta original no encontrada");
        //        }

        //        // 2. Crear nueva instancia de la oferta clonada con el nuevo número
        //        var clonedOferta = _mapper.Map<OfertasClientes>(originalOferta);
        //        clonedOferta.Id = 0;
        //        clonedOferta.NumeroOferta = newOferta;
        //        clonedOferta.FechaInicio = originalOferta.FechaInicio.Value.AddYears(1);
        //        clonedOferta.FechaFinalizacion = originalOferta.FechaFinalizacion.Value.AddYears(1);

        //        _db.GesOfertasClientes.Add(clonedOferta);
        //        _db.SaveChanges();

        //        // Guardar el Id de la nueva oferta para las relaciones
        //        var clonedOfertaId = clonedOferta.Id;

        //        var planta = _db.GesConfPlantasCliente.Where(x => x.Oferta == originalOferta.NumeroOferta && x.Deleted != true).ToList();
        //        if (planta != null)
        //        {
        //            foreach(var pl in planta)
        //            {
        //                var clonedPlanta = _mapper.Map<ConfPlantasCliente>(pl);
        //                clonedPlanta.Id = 0;
        //                clonedPlanta.Oferta = newOferta;
        //                clonedPlanta.Diagrama = "";
        //                _db.GesConfPlantasCliente.Add(pl);

        //                _db.SaveChanges();

        //                //// 4. Clonar los niveles de planta
        //                var nivelesPlanta = _db.GesConfNivelesPlantasCliente.Where(x => x.Oferta == originalOferta.NumeroOferta && x.Id_Planta == pl.Id && x.Deleted != true).ToList();
        //                if (nivelesPlanta != null)
        //                {
        //                    foreach (var nivel in nivelesPlanta)
        //                    {
        //                        var clonedNivel = _mapper.Map<ConfNivelesPlantasCliente>(nivel);
        //                        clonedNivel.Id = 0;
        //                        clonedNivel.Oferta = newOferta;
        //                        clonedNivel.Id_Planta = clonedPlanta.Id;
                                

        //                        _db.SaveChanges();

        //                        var idElementoClonado = clonedNivel.Id_Elemento;

        //                        var elementosRelacionados = _db.GesElementosPlanta
        //                            .Where(e => e.Id == nivel.Id_Elemento && e.Deleted != true)
        //                            .ToList();

        //                        if (elementosRelacionados != null)
        //                        {
        //                            // Clona cada elemento relacionado
        //                            foreach (var elemento in elementosRelacionados)
        //                            {
        //                                var clonedElemento = _mapper.Map<ElementosPlanta>(elemento);
        //                                clonedElemento.Id = 0;
        //                                _db.GesElementosPlanta.Add(clonedElemento);

        //                                _db.SaveChanges();

        //                                var clonedElementoId = clonedElemento.Id;

        //                                clonedNivel.Id_Elemento = clonedElemento.Id;
        //                                _db.GesConfNivelesPlantasCliente.Add(clonedNivel);

        //                                _db.SaveChanges();

        //                                var parametrosElemento = _db.GesParametrosElementoPlantaCliente.Where(x => x.Oferta == originalOferta.NumeroOferta && x.Id_Elemento == elemento.Id && x.Deleted != true).ToList();
        //                                if (parametrosElemento != null)
        //                                {
        //                                    foreach (var param in parametrosElemento)
        //                                    {
        //                                        var clonedParametros = _mapper.Map<ParametrosElementoPlantaCliente>(param);
        //                                        clonedParametros.Id = 0;
        //                                        clonedParametros.Id_Elemento = clonedElementoId;
        //                                        _db.GesParametrosElementoPlantaCliente.Add(clonedParametros);
        //                                    }

        //                                    _db.SaveChanges();
        //                                }

        //                                var parametrosAnalisisPlanta = _db.GesParametrosAnalisisPlanta.Where(x => x.Oferta == originalOferta.NumeroOferta && x.Elemento == elemento.Id && x.Deleted != true).ToList();
        //                                if (parametrosAnalisisPlanta != null)
        //                                {
        //                                    foreach (var param in parametrosAnalisisPlanta)
        //                                    {
        //                                        var clonedParametrosAnalisis = _mapper.Map<ParametrosAnalisisPlanta>(param);
        //                                        clonedParametrosAnalisis.Id = 0;
        //                                        clonedParametrosAnalisis.Elemento = clonedElementoId;
        //                                        clonedParametrosAnalisis.Fecha = param.Fecha.Value.AddYears(1);
        //                                        clonedParametrosAnalisis.Recogido = false;
        //                                        clonedParametrosAnalisis.FechaRecogido = null;
        //                                        clonedParametrosAnalisis.Realizado = false;
        //                                        clonedParametrosAnalisis.FechaRealizado = null;
        //                                        clonedParametrosAnalisis.Facturado = false;
        //                                        clonedParametrosAnalisis.NumeroFacturado = "";
        //                                        clonedParametrosAnalisis.Resultado = "";
        //                                        clonedParametrosAnalisis.Pdf = 0;
        //                                        clonedParametrosAnalisis.Recibido = false;
        //                                        clonedParametrosAnalisis.FechaPdf = null;
        //                                        clonedParametrosAnalisis.TextoCorreo = null;
        //                                        clonedParametrosAnalisis.Cancelado = false;
        //                                        clonedParametrosAnalisis.Incorrecto = false;
        //                                        clonedParametrosAnalisis.NoValido = false;

        //                                        _db.GesParametrosAnalisisPlanta.Add(clonedParametrosAnalisis);
        //                                    }

        //                                    _db.SaveChanges();
        //                                }

        //                                var tareas = _db.GesTareas.Where(x => x.Oferta == originalOferta.NumeroOferta && x.Elemento == elemento.Id && x.Deleted != true).ToList();
        //                                if (tareas != null)
        //                                {
        //                                    foreach (var tarea in tareas)
        //                                    {
        //                                        var clonedTareas = _mapper.Map<Tareas>(tarea);
        //                                        clonedTareas.Id = 0;
        //                                        clonedTareas.Elemento = clonedElementoId;
        //                                        clonedTareas.Fecha = tarea.Fecha.Value.AddYears(1);
        //                                        _db.GesTareas.Add(clonedTareas);

        //                                        var clonedTareasId = clonedTareas.Id;

        //                                        var tareasArchivos = _db.GesTareaArchivos.Where(x => x.IdTarea == tarea.Id && x.Deleted != true).ToList();

        //                                        if (tareasArchivos != null)
        //                                        {
        //                                            foreach (var tareaArch in tareasArchivos)
        //                                            {
        //                                                var clonedTareaArchivo = _mapper.Map<TareaArchivos>(tareaArch);
        //                                                clonedTareaArchivo.Id = 0;
        //                                                clonedTareaArchivo.IdTarea = clonedTareasId;
        //                                                _db.GesTareaArchivos.Add(clonedTareaArchivo);
        //                                            }

        //                                            _db.SaveChanges();
        //                                        }
        //                                    }

        //                                    _db.SaveChanges();
        //                                }

        //                                var valoresParametros = _db.GesValorParametros.Where(x => x.Oferta == originalOferta.NumeroOferta && x.Id_Elemento == elemento.Id && x.Fecha == null && x.Deleted != true).ToList();
        //                                if (valoresParametros != null)
        //                                {
        //                                    foreach (var valor in valoresParametros)
        //                                    {
        //                                        var clonedValores = _mapper.Map<ValorParametros>(valor);
        //                                        clonedValores.Id = 0;
        //                                        clonedValores.Id_Elemento = clonedElementoId;

        //                                        _db.GesValorParametros.Add(clonedValores);
        //                                    }
        //                                    _db.SaveChanges();
        //                                }
        //                            }
        //                            _db.SaveChanges();
        //                        }

        //                        var analisisPlantaRelacionados = _db.GesConfAnalisisNivelesPlantasCliente.Where(x => x.Id_NivelesPlanta == nivel.Id && x.Deleted != true).ToList();

        //                        if (analisisPlantaRelacionados != null)
        //                        {
        //                            foreach (var analisi in analisisPlantaRelacionados)
        //                            {
        //                                var clonedAnalisis = _mapper.Map<AnalisisNivelesPlantasCliente>(analisi);
        //                                clonedAnalisis.Id = 0;
        //                                _db.GesConfAnalisisNivelesPlantasCliente.Add(clonedAnalisis);
        //                            }

        //                            _db.SaveChanges();
        //                        }
        //                    }

        //                    _db.SaveChanges();
        //                }
        //            }

        //            _db.SaveChanges();
        //        }

        //        var consumos = _db.GesConsumos.Where(x => x.Oferta == originalOferta.NumeroOferta && x.Deleted != true).ToList();
        //        if(consumos != null)
        //        {
        //            foreach (var consumo in consumos)
        //            {
        //                var clonedConsumo = _mapper.Map<Consumos>(consumo);
        //                clonedConsumo.Id = 0;
        //                clonedConsumo.Oferta = newOferta;
        //                _db.GesConsumos.Add(clonedConsumo);
        //            }
        //        }
                
        //        var ofertasContactos = _db.GesOfertasContactos.Where(x => x.IdOferta == originalOferta.Id && x.Deleted != true).ToList();
        //        if(ofertasContactos != null)
        //        {
        //            foreach(var of in ofertasContactos)
        //            {
        //                var clonedContactos = _mapper.Map<OfertasContactos>(of);
        //                clonedContactos.Id = 0;
        //                clonedContactos.IdOferta = clonedOferta.Id;
        //                _db.GesOfertasContactos.Add(clonedContactos);
        //            }

        //            _db.SaveChanges();
        //        }

        //        var ofertasProductos = _db.GesOfertasProductos.Where(x => x.IdOferta == originalOferta.Id && x.Deleted != true).ToList();
        //        if (ofertasProductos != null)
        //        {
        //            foreach (var of in ofertasProductos)
        //            {
        //                var clonedProductos = _mapper.Map<OfertasProductos>(of);
        //                clonedProductos.Id = 0;
        //                clonedProductos.IdOferta = clonedOferta.Id;
        //                _db.GesOfertasProductos.Add(clonedProductos);
        //            }

        //            _db.SaveChanges();
        //        }

        //        _db.SaveChanges();

        //        return Ok("Clonado exitoso");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Internal server error: " + ex.Message);
        //    }
        //}

        [HttpPut]
        public void Update(int id, OfertasClientesDTO OfertasClientesDTO)
        {
            var oferta = _mapper.Map<OfertasClientes>(OfertasClientesDTO);

            _ofertasClientesService.Update(oferta);

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var of = _db.GesOfertasClientes.FirstOrDefault(x => x.Id == id && x.Deleted != true);
                if (of == null)
                {
                    return NotFound();
                }

                of.Deleted = true;

                var planta = _db.GesConfPlantasCliente.Where(x => x.Oferta == of.NumeroOferta && x.Deleted != true).ToList();
                if (planta != null)
                {
                    foreach (var pl in planta)
                    {
                        pl.Deleted = true;
                    }
                }

                var nivelesPlanta = _db.GesConfNivelesPlantasCliente.Where(x => x.Oferta == of.NumeroOferta && x.Deleted != true).ToList();
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

                var consumo = _db.GesConsumos.Where(x => x.Oferta == of.NumeroOferta && x.Deleted != true).ToList();
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

                var historialCorreo = _db.GesHistorialCorreosEnviados.Where(x => elementosIds.Contains(x.IdElemento) && x.Deleted != true).ToList();
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

                var ofertaContacto = _db.GesOfertasContactos.Where(x => x.IdOferta == of.Id && x.Deleted != true).ToList();
                if (ofertaContacto != null)
                {
                    foreach (var oferta in ofertaContacto)
                    {
                        oferta.Deleted = true;
                    }
                }

                var ofertaProducto = _db.GesOfertasProductos.Where(x => x.IdOferta == of.Id && x.Deleted != true).ToList();
                if (ofertaProducto != null)
                {
                    foreach (var oferta in ofertaProducto)
                    {
                        oferta.Deleted = true;
                    }
                }

                var parametrosAnalisis = _db.GesParametrosAnalisisPlanta.Where(x => x.Oferta == of.NumeroOferta && x.Deleted != true).ToList();
                if (parametrosAnalisis != null)
                {
                    foreach (var param in parametrosAnalisis)
                    {
                        param.Deleted = true;
                    }
                }

                var parametrosElemento = _db.GesParametrosElementoPlantaCliente.Where(x => x.Oferta == of.NumeroOferta && x.Deleted != true).ToList();
                if (parametrosElemento != null)
                {
                    foreach (var param in parametrosElemento)
                    {
                        param.Deleted = true;
                    }
                }

                var tareas = _db.GesTareas.Where(x => x.Oferta == of.NumeroOferta && x.Deleted != true).ToList();
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
                if (archivos != null)
                {
                    foreach (var file in archivos)
                    {
                        file.Deleted = true;
                    }
                }

                var valorParametros = _db.GesValorParametros.Where(x => x.Oferta == of.NumeroOferta && x.Deleted != true).ToList();
                if (valorParametros != null)
                {
                    foreach (var valor in valorParametros)
                    {
                        valor.Deleted = true;
                    }
                }

                _db.SaveChanges();

                return Ok(of);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
