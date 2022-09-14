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
    public class ValorParametrosController : ControllerBase
    {
        private readonly IRepository<ValorParametros> _valorParametrosService;
        private readonly IMapper _mapper;


        public ValorParametrosController(IRepository<ValorParametros> valorParametrosServicey, IMapper mapper)
        {
            _valorParametrosService = valorParametrosServicey;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var valores = _valorParametrosService.GetAll();
            var valoresDto = _mapper.Map<IEnumerable<ValorParametrosDTO>>(valores);
            var response = new ApiResponses<IEnumerable<ValorParametrosDTO>>(valoresDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var valores = await _valorParametrosService.GetById(id);
            var valoresDto = _mapper.Map<ValorParametrosDTO>(valores);
            var response = new ApiResponses<ValorParametrosDTO>(valoresDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ValorParametrosDTO valoresDto)
        {
            var valores = _mapper.Map<ValorParametros>(valoresDto);

            await _valorParametrosService.Add(valores);

            valoresDto = _mapper.Map<ValorParametrosDTO>(valores);
            var response = new ApiResponses<ValorParametrosDTO>(valoresDto);

            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ValorParametrosDTO valoresDto)
        {
            var valores = _mapper.Map<ValorParametros>(valoresDto);

            _valorParametrosService.Update(valores);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _valorParametrosService.Delete(id);

        }
    }
}
