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
    public class ClientesContactosController : ControllerBase
    {

        private readonly IRepository<ClientesContactos> _clientesContactosService;
        private readonly IMapper _mapper;

        public ClientesContactosController(IRepository<ClientesContactos> clientesContactosService, IMapper mapper)
        {
            _clientesContactosService = clientesContactosService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var clientes = _clientesContactosService.GetAll();
            var clientesDto = _mapper.Map<IEnumerable<ClientesContactosDTO>>(clientes);
            var response = new ApiResponses<IEnumerable<ClientesContactosDTO>>(clientesDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var cliente = await _clientesContactosService.GetById(id);
            var ClientesContactosDTO = _mapper.Map<ClientesContactosDTO>(cliente);
            var response = new ApiResponses<ClientesContactosDTO>(ClientesContactosDTO);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ClientesContactosDTO ClientesContactosDTO)
        {
            var cliente = _mapper.Map<ClientesContactos>(ClientesContactosDTO);

            await _clientesContactosService.Add(cliente);

            ClientesContactosDTO = _mapper.Map<ClientesContactosDTO>(cliente);
            var response = new ApiResponses<ClientesContactosDTO>(ClientesContactosDTO);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ClientesContactosDTO ClientesContactosDTO)
        {
            var cliente = _mapper.Map<ClientesContactos>(ClientesContactosDTO);

            _clientesContactosService.Update(cliente);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _clientesContactosService.Delete(id);

        }
    }
}
