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
    public class ConfPlantasClienteController : ControllerBase
    {
        private readonly IRepository<ConfPlantasCliente> _confPlantasClienteService;
        private readonly IMapper _mapper;


        public ConfPlantasClienteController(IRepository<ConfPlantasCliente> confPlantasClienteService, IMapper mapper)
        {
            _confPlantasClienteService = confPlantasClienteService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var confPlantasCliente = _confPlantasClienteService.GetAll();
            var confPlantasClienteDto = _mapper.Map<IEnumerable<ConfPlantasCliente>>(confPlantasCliente);
            var response = new ApiResponses<IEnumerable<ConfPlantasCliente>>(confPlantasClienteDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var cliente = await _confPlantasClienteService.GetById(id);
            var clienteDto = _mapper.Map<ConfPlantasCliente>(cliente);
            var response = new ApiResponses<ConfPlantasCliente>(clienteDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ConfPlantasCliente confPlantasClienteeDto)
        {
            var confPlantasCliente = _mapper.Map<ConfPlantasCliente>(confPlantasClienteeDto);

            await _confPlantasClienteService.Add(confPlantasCliente);

            confPlantasClienteeDto = _mapper.Map<ConfPlantasCliente>(confPlantasCliente);
            var response = new ApiResponses<ConfPlantasCliente>(confPlantasClienteeDto);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ConfPlantasCliente confPlantasClienteeDto)
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
