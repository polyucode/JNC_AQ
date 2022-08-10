using AnalisisQuimicos.Api.Responses;
using AnalisisQuimicos.Core.DTOs;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AutoMapper;
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
    public class OfertasProductosController : ControllerBase
    {

        private readonly IRepository<OfertasProductos> _ofertasProductosService;
        private readonly IMapper _mapper;

        public OfertasProductosController(IRepository<OfertasProductos> ofertasProductosService, IMapper mapper)
        {
            _ofertasProductosService = ofertasProductosService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var productos = _ofertasProductosService.GetAll();
            var productosDto = _mapper.Map<IEnumerable<OfertasProductosDTO>>(productos);
            var response = new ApiResponses<IEnumerable<OfertasProductosDTO>>(productosDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var producto = await _ofertasProductosService.GetById(id);
            var productoDTO = _mapper.Map<OfertasProductosDTO>(producto);
            var response = new ApiResponses<OfertasProductosDTO>(productoDTO);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(OfertasProductosDTO ProductoDTO)
        {
            var producto = _mapper.Map<OfertasProductos>(ProductoDTO);

            await _ofertasProductosService.Add(producto);

            ProductoDTO = _mapper.Map<OfertasProductosDTO>(producto);
            var response = new ApiResponses<OfertasProductosDTO>(ProductoDTO);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, OfertasProductosDTO ProductosDTO)
        {
            var producto = _mapper.Map<OfertasProductos>(ProductosDTO);

            _ofertasProductosService.Update(producto);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _ofertasProductosService.Delete(id);

        }
    }
}
