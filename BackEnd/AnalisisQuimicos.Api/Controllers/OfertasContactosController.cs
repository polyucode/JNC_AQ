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
    public class OfertasContactosController : ControllerBase
    {
        private readonly IRepository<OfertasContactos> _ofertasContactosService;
        private readonly IMapper _mapper;
        private readonly YucodeDevelopmentJNC_AQContext _db;

        public OfertasContactosController(IRepository<OfertasContactos> OfertasContactosService, IMapper mapper, YucodeDevelopmentJNC_AQContext db)
        {
            _ofertasContactosService = OfertasContactosService;
            _mapper = mapper;
            _db = db;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var ofertas = _ofertasContactosService.GetAll();
            var ofertasDto = _mapper.Map<IEnumerable<OfertasContactosDTO>>(ofertas);
            var response = new ApiResponses<IEnumerable<OfertasContactosDTO>>(ofertasDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var oferta = await _ofertasContactosService.GetById(id);
            var OfertasContactosDTO = _mapper.Map<OfertasContactosDTO>(oferta);
            var response = new ApiResponses<OfertasContactosDTO>(OfertasContactosDTO);
            return Ok(response);
        }

        [HttpGet("GetByOfferId")]
        public IActionResult GetByOfferId(int offerId)
        {
            ApiResponses<IEnumerable<OfertasContactosDTO>> response = null;
            try
            {
                var ofertas = _ofertasContactosService.GetAll();
                var ofertasFiltradas = ofertas.Where(x => x.IdOferta == offerId);
                var ofertasDto = _mapper.Map<IEnumerable<OfertasContactosDTO>>(ofertasFiltradas);
                response = new ApiResponses<IEnumerable<OfertasContactosDTO>>(ofertasDto);
            }
            catch (Exception ex)
            {

            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(OfertasContactosDTO OfertasContactosDTO)
        {
            var oferta = _mapper.Map<OfertasContactos>(OfertasContactosDTO);
            await _ofertasContactosService.Add(oferta);

            OfertasContactosDTO = _mapper.Map<OfertasContactosDTO>(oferta);
            var response = new ApiResponses<OfertasContactosDTO>(OfertasContactosDTO);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, OfertasContactosDTO OfertasContactosDTO)
        {
            var oferta = _mapper.Map<OfertasContactos>(OfertasContactosDTO);

            _ofertasContactosService.Update(oferta);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _ofertasContactosService.Delete(id);

        }

        [HttpPost("UpdateOfferContacts")]
        public async void UpdateOfferContacts(List<OfertasContactos> contactos, int idOfertaSeleccionada)
        {
            try
            {
                var ofertaContactos = _ofertasContactosService.GetAll();
                var oferFiltradas = ofertaContactos.Where(x => x.IdOferta == idOfertaSeleccionada).ToList();

                var lo = (from logs in _db.GesOfertasContactos where logs.IdOferta == idOfertaSeleccionada select logs).ToList();

                _db.GesOfertasContactos.RemoveRange(lo);
                _db.SaveChanges();
                foreach (var cont in contactos)
                {
                    cont.Id = 0;
                }
                _db.AddRange(contactos);
                _db.SaveChanges();
            }
            catch (Exception ex)
            {

            };
        }

        [HttpPost("InsertOfferContacts")]
        public async void InsertOfferContacts(List<OfertasContactos> contactos, int idOfertaSeleccionada)
        {
            try
            {
                var idOfertaCreada = (from log 
                                      in _db.GesOfertasClientes
                                      where log.NumeroOferta == idOfertaSeleccionada
                                      orderby log.Id descending
                                      select log).FirstOrDefault();
                foreach (var cont in contactos)
                {
                    cont.IdOferta= idOfertaCreada.Id;
                }
                _db.AddRange(contactos);
                _db.SaveChanges();
            }
            catch (Exception ex)
            {

            };
        }
    }
}
