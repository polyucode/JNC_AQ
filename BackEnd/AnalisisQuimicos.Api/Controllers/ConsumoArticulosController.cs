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
    public class ConsumoArticulosController : ControllerBase
    {

        private readonly IRepository<ConsumoArticulos> _consumoArticulosService;
        private readonly IMapper _mapper;

        public ConsumoArticulosController(IRepository<ConsumoArticulos> consumoArticulosService, IMapper mapper)
        {
            _consumoArticulosService = consumoArticulosService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var articulos = _consumoArticulosService.GetAll();
            var articulosDto = _mapper.Map<IEnumerable<ConsumoArticulosDTO>>(articulos);
            var response = new ApiResponses<IEnumerable<ConsumoArticulosDTO>>(articulosDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var articulo = await _consumoArticulosService.GetById(id);
            var ConsumoArticulosDTO = _mapper.Map<ConsumoArticulosDTO>(articulo);
            var response = new ApiResponses<ConsumoArticulosDTO>(ConsumoArticulosDTO);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ConsumoArticulosDTO ConsumoArticulosDTO)
        {
            var articulo = _mapper.Map<ConsumoArticulos>(ConsumoArticulosDTO);

            await _consumoArticulosService.Add(articulo);

            ConsumoArticulosDTO = _mapper.Map<ConsumoArticulosDTO>(articulo);
            var response = new ApiResponses<ConsumoArticulosDTO>(ConsumoArticulosDTO);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ConsumoArticulosDTO ConsumoArticulosDTO)
        {
            var articulo = _mapper.Map<ConsumoArticulos>(ConsumoArticulosDTO);

            _consumoArticulosService.Update(articulo);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _consumoArticulosService.Delete(id);

        }
    }
}
