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
    public class ProductosController : ControllerBase
    {
        private readonly IRepository<Productos> _productosService;
        private readonly IMapper _mapper;

        public ProductosController(IRepository<Productos> productosService, IMapper mapper)
        {
            _productosService = productosService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var productos = _productosService.GetAll();
            var productosDTO = _mapper.Map<IEnumerable<ProductosDTO>>(productos);
            var response = new ApiResponses<IEnumerable<ProductosDTO>>(productosDTO);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var producto = await _productosService.GetById(id);
            var ProductosDTO = _mapper.Map<ProductosDTO>(producto);
            var response = new ApiResponses<ProductosDTO>(ProductosDTO);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ProductosDTO ProductosDTO)
        {
            var producto = _mapper.Map<Productos>(ProductosDTO);
            await _productosService.Add(producto);

            ProductosDTO = _mapper.Map<ProductosDTO>(producto);
            var response = new ApiResponses<ProductosDTO>(ProductosDTO);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ProductosDTO ProductosDTO)
        {
            var producto = _mapper.Map<Productos>(ProductosDTO);

            _productosService.Update(producto);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _productosService.Delete(id);

        }
    }
}
