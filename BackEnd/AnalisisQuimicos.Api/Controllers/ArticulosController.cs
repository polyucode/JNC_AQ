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
    public class ArticulosController : ControllerBase
    {
        private readonly IRepository<Articulos> _articulosService;
        private readonly IMapper _mapper;

        public ArticulosController(IRepository<Articulos> articulosService, IMapper mapper)
        {
            _articulosService = articulosService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var articulos = _articulosService.GetAll();
            var articulosDTO = _mapper.Map<IEnumerable<ArticulosDTO>>(articulos);
            var response = new ApiResponses<IEnumerable<ArticulosDTO>>(articulosDTO);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var articulo = await _articulosService.GetById(id);
            var ArticulosDTO = _mapper.Map<ArticulosDTO>(articulo);
            var response = new ApiResponses<ArticulosDTO>(ArticulosDTO);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ArticulosDTO ArticulosDTO)
        {
            var articulo = _mapper.Map<Articulos>(ArticulosDTO);
            await _articulosService.Add(articulo);

            ArticulosDTO = _mapper.Map<ArticulosDTO>(articulo);
            var response = new ApiResponses<ArticulosDTO>(ArticulosDTO);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ArticulosDTO ArticulosDTO)
        {
            var articulo = _mapper.Map<Articulos>(ArticulosDTO);

            _articulosService.Update(articulo);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _articulosService.Delete(id);

        }
    }
}
