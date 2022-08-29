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
    public class EntregasController : ControllerBase
    {
        private readonly IRepository<Entregas> _entregasService;

        private readonly IMapper _mapper;


        public EntregasController(IRepository<Entregas> entregasServicey, IMapper mapper)
        {
            _entregasService = entregasServicey;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var entregas = _entregasService.GetAll();
            var entregasDto = _mapper.Map<IEnumerable<EntregasDTO>>(entregas);
            var response = new ApiResponses<IEnumerable<EntregasDTO>>(entregasDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var entregas = await _entregasService.GetById(id);
            var entregasDto = _mapper.Map<EntregasDTO>(entregas);
            var response = new ApiResponses<EntregasDTO>(entregasDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(EntregasDTO entregasDto)
        {
            var entregas = _mapper.Map<Entregas>(entregasDto);

            await _entregasService.Add(entregas);

            entregasDto = _mapper.Map<EntregasDTO>(entregas);
            var response = new ApiResponses<EntregasDTO>(entregasDto);

            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, EntregasDTO entregasDto)
        {
            var entregas = _mapper.Map<Entregas>(entregasDto);

            _entregasService.Update(entregas);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _entregasService.Delete(id);

        }
    }
}
