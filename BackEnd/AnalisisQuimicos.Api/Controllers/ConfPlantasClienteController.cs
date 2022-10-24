using AnalisisQuimicos.Api.Responses;
using AnalisisQuimicos.Core.DTOs;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.QueryFilters;
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
    public class ConfPlantasClienteController : ControllerBase
    {
        private readonly IConfPlantasClienteService _confPlantasClienteService;
        private readonly IMapper _mapper;


        public ConfPlantasClienteController(IConfPlantasClienteService confPlantasClienteService, IMapper mapper)
        {
            _confPlantasClienteService = confPlantasClienteService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var confPlantasCliente = _confPlantasClienteService.GetAll();
            var confPlantasClienteDto = _mapper.Map<IEnumerable<ConfPlantasClienteDTO>>(confPlantasCliente);
            var response = new ApiResponses<IEnumerable<ConfPlantasClienteDTO>>(confPlantasClienteDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var cliente = await _confPlantasClienteService.GetById(id);
            var clienteDto = _mapper.Map<ConfPlantasClienteDTO>(cliente);
            var response = new ApiResponses<ConfPlantasClienteDTO>(clienteDto);
            return Ok(response);
        }

        [HttpGet("planta")]
        public IActionResult GetByClient([FromQuery] ConfPlantasClienteQueryFilter filtro)
        {
            var cliente = _confPlantasClienteService.GetByClient(filtro).Result;
            var clienteDto = _mapper.Map<ConfPlantasClienteDTO>(cliente);
            var response = new ApiResponses<ConfPlantasClienteDTO>(clienteDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ConfPlantasClienteDTO confPlantasClienteDto)
        {
            var confPlantasCliente = _mapper.Map<ConfPlantasCliente>(confPlantasClienteDto);

            await _confPlantasClienteService.Add(confPlantasCliente);

            confPlantasClienteDto = _mapper.Map<ConfPlantasClienteDTO>(confPlantasCliente);
            var response = new ApiResponses<ConfPlantasClienteDTO>(confPlantasClienteDto);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ConfPlantasClienteDTO confPlantasClienteeDto)
        {
            var confPlantasCliente = _mapper.Map<ConfPlantasCliente>(confPlantasClienteeDto);

            _confPlantasClienteService.Update(confPlantasCliente);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _confPlantasClienteService.Delete(id);

        }
    }
}
