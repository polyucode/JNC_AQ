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
    public class ConsumosController : ControllerBase
    {

        private readonly IRepository<Consumos> _consumosService;
        private readonly IMapper _mapper;

        public ConsumosController(IRepository<Consumos> consumosService, IMapper mapper)
        {
            _consumosService = consumosService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var consumos = _consumosService.GetAll();
            var consumosDto = _mapper.Map<IEnumerable<ConsumosDTO>>(consumos);
            var response = new ApiResponses<IEnumerable<ConsumosDTO>>(consumosDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var consumo = await _consumosService.GetById(id);
            var ConsumosDTO = _mapper.Map<ConsumosDTO>(consumo);
            var response = new ApiResponses<ConsumosDTO>(ConsumosDTO);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ConsumosDTO ConsumosDTO)
        {
            var consumo = _mapper.Map<Consumos>(ConsumosDTO);

            await _consumosService.Add(consumo);

            ConsumosDTO = _mapper.Map<ConsumosDTO>(consumo);
            var response = new ApiResponses<ConsumosDTO>(ConsumosDTO);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ConsumosDTO ConsumosDTO)
        {
            var consumo = _mapper.Map<Consumos>(ConsumosDTO);

            _consumosService.Update(consumo);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _consumosService.Delete(id);

        }
    }
}
