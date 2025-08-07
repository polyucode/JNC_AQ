using AnalisisQuimicos.Api.Responses;
using AnalisisQuimicos.Core.DTOs;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Infrastructure.Data;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfertasProductosController : ControllerBase
    {
        private readonly IRepository<OfertasProductos> _ofertasProductosService;
        private readonly IMapper _mapper;
        private readonly YucodeDevelopmentJNC_AQContext _db;

        public OfertasProductosController(IRepository<OfertasProductos> OfertasProductosService, IMapper mapper, YucodeDevelopmentJNC_AQContext db)
        {
            _ofertasProductosService = OfertasProductosService;
            _mapper = mapper;
            _db = db;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var ofertas = _ofertasProductosService.GetAll();
            var ofertasDto = _mapper.Map<IEnumerable<OfertasProductosDTO>>(ofertas);
            var response = new ApiResponses<IEnumerable<OfertasProductosDTO>>(ofertasDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var oferta = await _ofertasProductosService.GetById(id);
            var OfertasProductosDTO = _mapper.Map<OfertasProductosDTO>(oferta);
            var response = new ApiResponses<OfertasProductosDTO>(OfertasProductosDTO);
            return Ok(response);
        }

        [HttpGet("GetByOfferId")]
        public IActionResult GetByOfferId(int offerId)
        {
            ApiResponses<IEnumerable<OfertasProductosDTO>> response = null;
            try
            {
                var ofertas = _ofertasProductosService.GetAll();
                var ofertasFiltradas = ofertas.Where(x => x.IdOferta == offerId);
                var ofertasDto = _mapper.Map<IEnumerable<OfertasProductosDTO>>(ofertasFiltradas);
                response = new ApiResponses<IEnumerable<OfertasProductosDTO>>(ofertasDto);
            }
            catch (Exception ex)
            {

            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(OfertasProductosDTO OfertasProductosAsociadosDTO)
        {
            var oferta = _mapper.Map<OfertasProductos>(OfertasProductosAsociadosDTO);
            await _ofertasProductosService.Add(oferta);

            OfertasProductosAsociadosDTO = _mapper.Map<OfertasProductosDTO>(oferta);
            var response = new ApiResponses<OfertasProductosDTO>(OfertasProductosAsociadosDTO);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, OfertasProductosDTO OfertasProductosAsociadosDTO)
        {
            var oferta = _mapper.Map<OfertasProductos>(OfertasProductosAsociadosDTO);

            _ofertasProductosService.Update(oferta);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _ofertasProductosService.Delete(id);

        }

        [HttpPost("UpdateOfferProducts")]
        public async void UpdateOfferProducts(List<OfertasProductos> productos, int idOfertaSeleccionada)
        {
            try
            {
                var ofertaContactos = _ofertasProductosService.GetAll();
                var oferFiltradas = ofertaContactos.Where(x => x.IdOferta == idOfertaSeleccionada).ToList();

                var lo = (from logs in _db.GesOfertasContactos where logs.IdOferta == idOfertaSeleccionada select logs).ToList();

                _db.GesOfertasContactos.RemoveRange(lo);
                _db.SaveChanges();
                foreach (var cont in productos)
                {
                    cont.Id = 0;
                }
                _db.AddRange(productos);
                _db.SaveChanges();
            }
            catch (Exception ex)
            {

            };
        }

        [HttpPost("InsertOfferProducts")]
        public async void InsertOfferProducts(List<OfertasProductos> productos, int idOfertaSeleccionada)
        {
            try
            {
                var idOfertaCreada = (from log
                                      in _db.GesOfertasClientes
                                      where log.NumeroOferta == idOfertaSeleccionada
                                      orderby log.Id descending
                                      select log).FirstOrDefault();
                foreach (var prod in productos)
                {
                    prod.IdOferta = idOfertaCreada.Id;
                }
                _db.AddRange(productos);
                _db.SaveChanges();
            }
            catch (Exception ex)
            {

            };
        }
    }
}
