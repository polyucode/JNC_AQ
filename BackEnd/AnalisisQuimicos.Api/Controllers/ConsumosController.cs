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
            var consumosDto = _mapper.Map<IEnumerable<Consumos>>(consumos);
            var response = new ApiResponses<IEnumerable<Consumos>>(consumosDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var consumo = await _consumosService.GetById(id);
            var consumoDto = _mapper.Map<ConsumosDTO>(consumo);
            var response = new ApiResponses<ConsumosDTO>(consumoDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(Consumos consumosDto)
        {
            var consumos = _mapper.Map<Consumos>(consumosDto);

            await _consumosService.Add(consumos);

            consumosDto = _mapper.Map<Consumos>(consumos);
            var response = new ApiResponses<Consumos>(consumosDto);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, Consumos consumosDto)
        {
            var consumos = _mapper.Map<Consumos>(consumosDto);

            _consumosService.Update(consumos);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _consumosService.Delete(id);

        }
    }
}
