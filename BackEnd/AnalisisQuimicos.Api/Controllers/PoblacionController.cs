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
        public class PoblacionController : ControllerBase
        {
            private readonly IRepository<Poblaciones> _poblacionService;
            private readonly IMapper _mapper;


            public PoblacionController(IRepository<Poblaciones> clienteServicey, IMapper mapper)
            {
                _poblacionService = clienteServicey;
                _mapper = mapper;
            }

            [HttpGet]
            public IActionResult GetAll()
            {
                var clientes = _poblacionService.GetAll();
                var clientesDto = _mapper.Map<IEnumerable<PoblacionDto>>(clientes);
                var response = new ApiResponses<IEnumerable<PoblacionDto>>(clientesDto);
                return Ok(response);
            }

            [HttpGet("{id}")]
            public async Task<IActionResult> GetById(int id)

            {
                var cliente = await _poblacionService.GetById(id);
                var clienteDto = _mapper.Map<PoblacionDto>(cliente);
                var response = new ApiResponses<PoblacionDto>(clienteDto);
                return Ok(response);
            }

            [HttpPost]
            public async Task<IActionResult> Insert(PoblacionDto clienteDto)
            {
                var cliente = _mapper.Map<Poblaciones>(clienteDto);

                await _poblacionService.Add(cliente);

                clienteDto = _mapper.Map<PoblacionDto>(cliente);
                var response = new ApiResponses<PoblacionDto>(clienteDto);
                return Ok(response);
            }

            [HttpPut]
            public void Update(int id, PoblacionDto clienteDto)
            {
                var cliente = _mapper.Map<Poblaciones>(clienteDto);

                _poblacionService.Update(cliente);

            }

            [HttpDelete("{id}")]
            public async Task Delete(int id)
            {

                await _poblacionService.Delete(id);

            }
        }
    }

