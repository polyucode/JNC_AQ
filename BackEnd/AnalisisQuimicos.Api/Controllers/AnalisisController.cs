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
    public class AnalisisController : ControllerBase
    {
        private readonly IRepository<Analisis> _analisisService;
        private readonly IMapper _mapper;


        public AnalisisController(IRepository<Analisis> analisisService, IMapper mapper)
        {
            _analisisService = analisisService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var analisis = _analisisService.GetAll();
            var analisisDto = _mapper.Map<IEnumerable<Analisis>>(analisis);
            var response = new ApiResponses<IEnumerable<Analisis>>(analisisDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var analisi = await _analisisService.GetById(id);
            var analisiDto = _mapper.Map<AnalisisDTO>(analisi);
            var response = new ApiResponses<AnalisisDTO>(analisiDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(Analisis analisisDto)
        {
            var analisis = _mapper.Map<Analisis>(analisisDto);

            await _analisisService.Add(analisis);

            analisisDto = _mapper.Map<Analisis>(analisis);
            var response = new ApiResponses<Analisis>(analisisDto);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, Analisis analisisDto)
        {
            var analisis = _mapper.Map<Analisis>(analisisDto);

            _analisisService.Update(analisis);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _analisisService.Delete(id);

        }
    }
}
