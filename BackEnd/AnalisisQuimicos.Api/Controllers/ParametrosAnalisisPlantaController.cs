using AnalisisQuimicos.Api.Responses;
using AnalisisQuimicos.Core.DTOs;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.QueryFilters;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Api.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ParametrosAnalisisPlantaController : ControllerBase
    {

        private readonly IParametrosAnalisisPlantaService _parametrosAnalisisPlantaService;
        private readonly IMapper _mapper;

        public ParametrosAnalisisPlantaController(IParametrosAnalisisPlantaService parametrosAnalisisPlantaService, IMapper mapper)
        {
            _parametrosAnalisisPlantaService = parametrosAnalisisPlantaService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var analisis = _parametrosAnalisisPlantaService.GetAll();
            var analisisDto = _mapper.Map<IEnumerable<ParametrosAnalisisPlantaDTO>>(analisis);
            var response = new ApiResponses<IEnumerable<ParametrosAnalisisPlantaDTO>>(analisisDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var analisis = await _parametrosAnalisisPlantaService.GetById(id);
            var ParametrosAnalisisPlantaDTO = _mapper.Map<ParametrosAnalisisPlantaDTO>(analisis);
            var response = new ApiResponses<ParametrosAnalisisPlantaDTO>(ParametrosAnalisisPlantaDTO);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ParametrosAnalisisPlantaDTO ParametrosAnalisisPlantaDTO)
        {
            var analisis = _mapper.Map<ParametrosAnalisisPlanta>(ParametrosAnalisisPlantaDTO);

            await _parametrosAnalisisPlantaService.Add(analisis);

            ParametrosAnalisisPlantaDTO = _mapper.Map<ParametrosAnalisisPlantaDTO>(analisis);
            var response = new ApiResponses<ParametrosAnalisisPlantaDTO>(ParametrosAnalisisPlantaDTO);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ParametrosAnalisisPlantaDTO ParametrosAnalisisPlantaDTO)
        {
            var analisis = _mapper.Map<ParametrosAnalisisPlanta>(ParametrosAnalisisPlantaDTO);

            _parametrosAnalisisPlantaService.Update(analisis);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _parametrosAnalisisPlantaService.Delete(id);

        }

        [HttpGet("analisis")]
        public IActionResult GetAnalisis([FromQuery] ParametrosAnalisisQueryFilter analisisFilter)
        {
            var analisis = _parametrosAnalisisPlantaService.GetAnalisis(analisisFilter);
            var analisissDTO = _mapper.Map<IEnumerable<ParametrosAnalisisPlanta>>(analisis);
            var response = new ApiResponses<IEnumerable<ParametrosAnalisisPlanta>>(analisissDTO);
            return Ok(response);
        }
    }
}
