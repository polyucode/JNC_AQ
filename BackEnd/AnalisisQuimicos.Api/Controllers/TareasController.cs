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
    public class TareasController : ControllerBase
    {
        private readonly IRepository<Tareas> _tareasService;
        private readonly IRepository<ParametrosAnalisisPlanta> _parametrosAnalisisPlantaService;

        private readonly IMapper _mapper;


        public TareasController(IRepository<Tareas> tareasServicey, IMapper mapper)
        {
            _tareasService = tareasServicey;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var tareas = _tareasService.GetAll();
            var tareasDto = _mapper.Map<IEnumerable<TareasDTO>>(tareas);
            var response = new ApiResponses<IEnumerable<TareasDTO>>(tareasDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var tareas = await _tareasService.GetById(id);
            var tareasDto = _mapper.Map<TareasDTO>(tareas);
            var response = new ApiResponses<TareasDTO>(tareasDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(TareasDTO tareasDto)
        {
            var tareas = _mapper.Map<Tareas>(tareasDto);

            await _tareasService.Add(tareas);

            tareasDto = _mapper.Map<TareasDTO>(tareas);
            var response = new ApiResponses<TareasDTO>(tareasDto);

            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, TareasDTO tareasDto)
        {
            var tareas = _mapper.Map<Tareas>(tareasDto);

            _tareasService.Update(tareas);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _tareasService.Delete(id);

        }
    }
}
