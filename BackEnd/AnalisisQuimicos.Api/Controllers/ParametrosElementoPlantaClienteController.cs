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
    public class ParametrosElementoPlantaClienteController : ControllerBase
    {
        private readonly IRepository<ParametrosElementoPlantaCliente> _parametrosElementoPlantaClienteService;
        private readonly IMapper _mapper;


        public ParametrosElementoPlantaClienteController(IRepository<ParametrosElementoPlantaCliente> confPlantasClienteService, IMapper mapper)
        {
            _parametrosElementoPlantaClienteService = confPlantasClienteService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var confPlantasCliente = _parametrosElementoPlantaClienteService.GetAll();
            var confPlantasClienteDto = _mapper.Map<IEnumerable<ParametrosElementoPlantaCliente>>(confPlantasCliente);
            var response = new ApiResponses<IEnumerable<ParametrosElementoPlantaCliente>>(confPlantasClienteDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var cliente = await _parametrosElementoPlantaClienteService.GetById(id);
            var clienteDto = _mapper.Map<ParametrosElementoPlantaCliente>(cliente);
            var response = new ApiResponses<ParametrosElementoPlantaCliente>(clienteDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ParametrosElementoPlantaCliente confPlantasClienteeDto)
        {
            var confPlantasCliente = _mapper.Map<ParametrosElementoPlantaCliente>(confPlantasClienteeDto);

            await _parametrosElementoPlantaClienteService.Add(confPlantasCliente);

            confPlantasClienteeDto = _mapper.Map<ParametrosElementoPlantaCliente>(confPlantasCliente);
            var response = new ApiResponses<ParametrosElementoPlantaCliente>(confPlantasClienteeDto);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ParametrosElementoPlantaCliente confPlantasClienteeDto)
        {
            var confPlantasCliente = _mapper.Map<ParametrosElementoPlantaCliente>(confPlantasClienteeDto);

            _parametrosElementoPlantaClienteService.Update(confPlantasCliente);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _parametrosElementoPlantaClienteService.Delete(id);

        }
    }
}
