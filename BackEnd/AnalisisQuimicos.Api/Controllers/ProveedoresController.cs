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
    public class ProveedoresController : ControllerBase
    {
        private readonly IRepository<Proveedores> _proveedoresService;
        private readonly IMapper _mapper;

        public ProveedoresController(IRepository<Proveedores> proveedoresService, IMapper mapper)
        {
            _proveedoresService = proveedoresService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var proveedores = _proveedoresService.GetAll();
            var proveedoresDTO = _mapper.Map<IEnumerable<ProveedoresDTO>>(proveedores);
            var response = new ApiResponses<IEnumerable<ProveedoresDTO>>(proveedoresDTO);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var proveedor = await _proveedoresService.GetById(id);
            var proveedorDTO = _mapper.Map<ProveedoresDTO>(proveedor);
            var response = new ApiResponses<ProveedoresDTO>(proveedorDTO);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ProveedoresDTO ProveedoresDTO)
        {
            var proveedor = _mapper.Map<Proveedores>(ProveedoresDTO);
            await _proveedoresService.Add(proveedor);

            ProveedoresDTO = _mapper.Map<ProveedoresDTO>(proveedor);
            var response = new ApiResponses<ProveedoresDTO>(ProveedoresDTO);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ProveedoresDTO ProveedoresDTO)
        {
            var proveedor = _mapper.Map<Proveedores>(ProveedoresDTO);

            _proveedoresService.Update(proveedor);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _proveedoresService.Delete(id);

        }
    }
}

