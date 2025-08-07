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
    public class CorreosController : ControllerBase
    {
        private readonly IRepository<Correos> _correosService;
        private readonly IMapper _mapper;


        public CorreosController(IRepository<Correos> correosService, IMapper mapper)
        {
            _correosService = correosService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var correos = _correosService.GetAll();
            var correosDto = _mapper.Map<IEnumerable<Correos>>(correos);
            var response = new ApiResponses<IEnumerable<Correos>>(correosDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var correo = await _correosService.GetById(id);
            var correoDto = _mapper.Map<CorreosDTO>(correo);
            var response = new ApiResponses<CorreosDTO>(correoDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(Correos correosDto)
        {
            var correos = _mapper.Map<Correos>(correosDto);

            await _correosService.Add(correos);

            correosDto = _mapper.Map<Correos>(correos);
            var response = new ApiResponses<Correos>(correosDto);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, Correos correosDto)
        {
            var correos = _mapper.Map<Correos>(correosDto);

            _correosService.Update(correos);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _correosService.Delete(id);

        }
    }
}
