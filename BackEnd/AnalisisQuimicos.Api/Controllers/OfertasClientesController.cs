using AnalisisQuimicos.Api.Responses;
using AnalisisQuimicos.Core.DTOs;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
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

        public OfertasClientesController(IRepository<OfertasClientes> ofertasClientesService, IMapper mapper)
        {
            _ofertasClientesService = ofertasClientesService;
            _mapper = mapper;
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

        [HttpPut]
        public void Update(int id, OfertasClientesDTO OfertasClientesDTO)
        {
            var oferta = _mapper.Map<OfertasClientes>(OfertasClientesDTO);

            _ofertasClientesService.Update(oferta);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _ofertasClientesService.Delete(id);

        }
    }
}
