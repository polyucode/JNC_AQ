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
    public class ConfNivelesPlantasClienteController : ControllerBase
    {
        private readonly IRepository<ConfNivelesPlantasCliente> _confNivelesPlantasClienteService;
        private readonly IMapper _mapper;


        public ConfNivelesPlantasClienteController(IRepository<ConfNivelesPlantasCliente> confNivelesPlantasClienteService, IMapper mapper)
        {
            _confNivelesPlantasClienteService = confNivelesPlantasClienteService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var confNivelesPlantasCliente = _confNivelesPlantasClienteService.GetAll();
            var confNivelesPlantasClienteDto = _mapper.Map<IEnumerable<ConfNivelesPlantasCliente>>(confNivelesPlantasCliente);
            var response = new ApiResponses<IEnumerable<ConfNivelesPlantasCliente>>(confNivelesPlantasClienteDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var cliente = await _confNivelesPlantasClienteService.GetById(id);
            var clienteDto = _mapper.Map<ConfNivelesPlantasCliente>(cliente);
            var response = new ApiResponses<ConfNivelesPlantasCliente>(clienteDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ConfNivelesPlantasCliente confNivelesPlantasClienteeDto)
        {
            var confNivelesPlantasCliente = _mapper.Map<ConfNivelesPlantasCliente>(confNivelesPlantasClienteeDto);

            await _confNivelesPlantasClienteService.Add(confNivelesPlantasCliente);

            confNivelesPlantasClienteeDto = _mapper.Map<ConfNivelesPlantasCliente>(confNivelesPlantasCliente);
            var response = new ApiResponses<ConfNivelesPlantasCliente>(confNivelesPlantasClienteeDto);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ConfNivelesPlantasCliente confNivelesPlantasClienteeDto)
        {
            var confNivelesPlantasCliente = _mapper.Map<ConfNivelesPlantasCliente>(confNivelesPlantasClienteeDto);

            _confNivelesPlantasClienteService.Update(confNivelesPlantasCliente);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _confNivelesPlantasClienteService.Delete(id);

        }
    }
}
