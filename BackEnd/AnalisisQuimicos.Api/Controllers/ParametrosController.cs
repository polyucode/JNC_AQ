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
    public class ParametrosController : ControllerBase
    {
        private readonly IRepository<Parametros> _parametros;
        private readonly IMapper _mapper;

        public ParametrosController(IRepository<Parametros> parametros, IMapper mapper)
        {
            _parametros = parametros;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var analisis = _parametros.GetAll();
            var analisisDto = _mapper.Map<IEnumerable<ParametrosDTO>>(analisis);
            var response = new ApiResponses<IEnumerable<ParametrosDTO>>(analisisDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var analisis = await _parametros.GetById(id);
            var ParametrosDTO = _mapper.Map<ParametrosDTO>(analisis);
            var response = new ApiResponses<ParametrosDTO>(ParametrosDTO);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(Parametros ParametrosDTO)
        {
            var analisis = _mapper.Map<Parametros>(ParametrosDTO);

            await _parametros.Add(analisis);

            ParametrosDTO = _mapper.Map<Parametros>(_parametros);
            var response = new ApiResponses<Parametros>(ParametrosDTO);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ParametrosDTO ParametrosDTO)
        {
            var analisis = _mapper.Map<Parametros>(ParametrosDTO);

            _parametros.Update(analisis);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _parametros.Delete(id);

        }
    }
}
