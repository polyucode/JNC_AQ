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
    public class AnalisisNivelesPlantasClienteController : ControllerBase
    {
        private readonly IRepository<AnalisisNivelesPlantasCliente> _analisisNivelesPlantasClienteService;
        private readonly IMapper _mapper;


        public AnalisisNivelesPlantasClienteController(IRepository<AnalisisNivelesPlantasCliente> analisisNivelesPlantasClienteService, IMapper mapper)
        {
            _analisisNivelesPlantasClienteService = analisisNivelesPlantasClienteService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var analisisNivelesPlantasCliente = _analisisNivelesPlantasClienteService.GetAll();
            var analisisNivelesPlantasClienteDto = _mapper.Map<IEnumerable<AnalisisNivelesPlantasCliente>>(analisisNivelesPlantasCliente);
            var response = new ApiResponses<IEnumerable<AnalisisNivelesPlantasCliente>>(analisisNivelesPlantasClienteDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var analisi = await _analisisNivelesPlantasClienteService.GetById(id);
            var analisiDto = _mapper.Map<AnalisisNivelesPlantasClienteDTO>(analisi);
            var response = new ApiResponses<AnalisisNivelesPlantasClienteDTO>(analisiDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(AnalisisNivelesPlantasCliente analisisNivelesPlantasClienteDto)
        {
            var analisisNivelesPlantasCliente = _mapper.Map<AnalisisNivelesPlantasCliente>(analisisNivelesPlantasClienteDto);

            await _analisisNivelesPlantasClienteService.Add(analisisNivelesPlantasCliente);

            analisisNivelesPlantasClienteDto = _mapper.Map<AnalisisNivelesPlantasCliente>(analisisNivelesPlantasCliente);
            var response = new ApiResponses<AnalisisNivelesPlantasCliente>(analisisNivelesPlantasClienteDto);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, AnalisisNivelesPlantasCliente analisisNivelesPlantasClienteDto)
        {
            var analisisNivelesPlantasCliente = _mapper.Map<AnalisisNivelesPlantasCliente>(analisisNivelesPlantasClienteDto);

            _analisisNivelesPlantasClienteService.Update(analisisNivelesPlantasCliente);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _analisisNivelesPlantasClienteService.Delete(id);

        }
    }
}
