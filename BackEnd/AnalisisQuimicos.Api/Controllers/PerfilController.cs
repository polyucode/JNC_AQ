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
    public class PerfilController : ControllerBase
    {
        private readonly IRepository<Perfiles> _perfilService;
        private readonly IMapper _mapper;


        public PerfilController(IRepository<Perfiles> perfilService, IMapper mapper)
        {
            _perfilService = perfilService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var clientes = _perfilService.GetAll();
            var clientesDto = _mapper.Map<IEnumerable<PerfilDto>>(clientes);
            var response = new ApiResponses<IEnumerable<PerfilDto>>(clientesDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var cliente = await _perfilService.GetById(id);
            var clienteDto = _mapper.Map<PerfilDto>(cliente);
            var response = new ApiResponses<PerfilDto>(clienteDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(PerfilDto clienteDto)
        {
            var cliente = _mapper.Map<Perfiles>(clienteDto);

            await _perfilService.Add(cliente);

            clienteDto = _mapper.Map<PerfilDto>(cliente);
            var response = new ApiResponses<PerfilDto>(clienteDto);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, PerfilDto clienteDto)
        {
            var cliente = _mapper.Map<Perfiles>(clienteDto);

            _perfilService.Update(cliente);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _perfilService.Delete(id);

        }
    }
}
