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
    public class ElementosPlantaController : ControllerBase
    {
        private readonly IRepository<ElementosPlanta> _clienteService;
        private readonly IMapper _mapper;


        public ElementosPlantaController(IRepository<ElementosPlanta> clienteServicey, IMapper mapper)
        {
            _clienteService = clienteServicey;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var clientes = _clienteService.GetAll();
            var clientesDto = _mapper.Map<IEnumerable<ElementosPlantaDto>>(clientes);
            var response = new ApiResponses<IEnumerable<ElementosPlantaDto>>(clientesDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var cliente = await _clienteService.GetById(id);
            var clienteDto = _mapper.Map<ElementosPlantaDto>(cliente);
            var response = new ApiResponses<ElementosPlantaDto>(clienteDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ElementosPlantaDto clienteDto)
        {
            var cliente = _mapper.Map<ElementosPlanta>(clienteDto);

            await _clienteService.Add(cliente);

            clienteDto = _mapper.Map<ElementosPlantaDto>(cliente);
            var response = new ApiResponses<ElementosPlantaDto>(clienteDto);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ElementosPlantaDto clienteDto)
        {
            var cliente = _mapper.Map<ElementosPlanta>(clienteDto);

            _clienteService.Update(cliente);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _clienteService.Delete(id);

        }
    }
}
