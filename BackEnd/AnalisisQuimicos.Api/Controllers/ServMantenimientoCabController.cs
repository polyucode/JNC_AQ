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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ServMantenimientoCabController : ControllerBase
    {
        private readonly IRepository<ServMantenimientoCab> _clienteService;
        private readonly IRepository<ServMantenimientoDet> _servmantenimientoDetService;

        private readonly IMapper _mapper;


        public ServMantenimientoCabController(IRepository<ServMantenimientoCab> clienteServicey, IMapper mapper)
        {
            _clienteService = clienteServicey;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var clientes = _clienteService.GetAll();
            var clientesDto = _mapper.Map<IEnumerable<ServMantenimientoCabDto>>(clientes);
            var response = new ApiResponses<IEnumerable<ServMantenimientoCabDto>>(clientesDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var cliente = await _clienteService.GetById(id);
            var clienteDto = _mapper.Map<ServMantenimientoCabDto>(cliente);
            var response = new ApiResponses<ServMantenimientoCabDto>(clienteDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ServMantenimientoCabDto clienteDto)
        {
            var cliente = _mapper.Map<ServMantenimientoCab>(clienteDto);

            await _clienteService.Add(cliente);

            clienteDto = _mapper.Map<ServMantenimientoCabDto>(cliente);
            var response = new ApiResponses<ServMantenimientoCabDto>(clienteDto);

            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ServMantenimientoCabDto clienteDto)
        {
            var cliente = _mapper.Map<ServMantenimientoCab>(clienteDto);

            _clienteService.Update(cliente);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _clienteService.Delete(id);

        }
    }
}
