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
    public class ClienteController : ControllerBase
    {
        private readonly IRepository<Clientes> _clienteService;
        private readonly IMapper _mapper;


        public ClienteController(IRepository<Clientes> clienteServicey, IMapper mapper)
        {
            _clienteService = clienteServicey;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var clientes = _clienteService.GetAll();
            var clientesDto = _mapper.Map<IEnumerable<ClienteDto>>(clientes);
            var response = new ApiResponses<IEnumerable<ClienteDto>>(clientesDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var cliente = await _clienteService.GetById(id);
            var clienteDto = _mapper.Map<ClienteDto>(cliente);
            var response = new ApiResponses<ClienteDto>(clienteDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ClienteDto clienteDto)
        {
            var cliente = _mapper.Map<Clientes>(clienteDto);

            await _clienteService.Add(cliente);

            clienteDto = _mapper.Map<ClienteDto>(cliente);
            var response = new ApiResponses<ClienteDto>(clienteDto);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ClienteDto clienteDto)
        {
            var cliente = _mapper.Map<Clientes>(clienteDto);

            _clienteService.Update(cliente);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _clienteService.Delete(id);

        }
    }
}
