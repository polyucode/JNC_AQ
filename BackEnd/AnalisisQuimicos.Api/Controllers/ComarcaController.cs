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
        public class ComarcaController : ControllerBase
        {
            private readonly IRepository<Comarcas> _comarcaService;
            private readonly IMapper _mapper;


            public ComarcaController(IRepository<Comarcas> clienteServicey, IMapper mapper)
            {
                _comarcaService = clienteServicey;
                _mapper = mapper;
            }

            [HttpGet]
            public IActionResult GetAll()
            {
                var clientes = _comarcaService.GetAll();
                var clientesDto = _mapper.Map<IEnumerable<ComarcaDto>>(clientes);
                var response = new ApiResponses<IEnumerable<ComarcaDto>>(clientesDto);
                return Ok(response);
            }

            [HttpGet("{id}")]
            public async Task<IActionResult> GetById(int id)

            {
                var cliente = await _comarcaService.GetById(id);
                var clienteDto = _mapper.Map<ComarcaDto>(cliente);
                var response = new ApiResponses<ComarcaDto>(clienteDto);
                return Ok(response);
            }

            [HttpPost]
            public async Task<IActionResult> Insert(ComarcaDto clienteDto)
            {
                var cliente = _mapper.Map<Comarcas>(clienteDto);

                await _comarcaService.Add(cliente);

                clienteDto = _mapper.Map<ComarcaDto>(cliente);
                var response = new ApiResponses<ComarcaDto>(clienteDto);
                return Ok(response);
            }

            [HttpPut]
            public void Update(int id, ComarcaDto clienteDto)
            {
                var cliente = _mapper.Map<Comarcas>(clienteDto);

                _comarcaService.Update(cliente);

            }

            [HttpDelete("{id}")]
            public async Task Delete(int id)
            {

                await _comarcaService.Delete(id);

            }
        }
}
