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
    public class ElementosController : ControllerBase
    {
        private readonly IRepository<Elementos> _elementosService;
        private readonly IMapper _mapper;

        public ElementosController(IRepository<Elementos> elementosService, IMapper mapper)
        {
            _elementosService = elementosService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var elementos = _elementosService.GetAll();
            var elementosDTO = _mapper.Map<IEnumerable<ElementosDTO>>(elementos);
            var response = new ApiResponses<IEnumerable<ElementosDTO>>(elementosDTO);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var elemento = await _elementosService.GetById(id);
            var elementoDTO = _mapper.Map<ElementosDTO>(elemento);
            var response = new ApiResponses<ElementosDTO>(elementoDTO);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ElementosDTO ElementosDTO)
        {
            var elemento = _mapper.Map<Elementos>(ElementosDTO);
            await _elementosService.Add(elemento);

            ElementosDTO = _mapper.Map<ElementosDTO>(elemento);
            var response = new ApiResponses<ElementosDTO>(ElementosDTO);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ElementosDTO ElementosDTO)
        {
            var elemento = _mapper.Map<Elementos>(ElementosDTO);

            _elementosService.Update(elemento);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _elementosService.Delete(id);

        }
    }
}

