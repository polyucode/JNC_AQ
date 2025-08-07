using AnalisisQuimicos.Api.Responses;
using AnalisisQuimicos.Core.DTOs;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.QueryFilters;
using AnalisisQuimicos.Core.Services;
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
    public class HistorialCorreosEnviadosController : ControllerBase
    {
        private readonly IHistorialCorreosContactosService _historialCorreosService;
        private readonly IMapper _mapper;


        public HistorialCorreosEnviadosController(IHistorialCorreosContactosService historialCorreosService, IMapper mapper)
        {
            _historialCorreosService = historialCorreosService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetByCodigoClienteIdElemento(int codigoCliente, int idElemento)
        {
            //var confNivelesPlantasCliente = _confNivelesPlantasClienteService.GetAll();
            //var confNivelesPlantasClienteDto = _mapper.Map<IEnumerable<ConfNivelesPlantasCliente>>(confNivelesPlantasCliente);
            //var response = new ApiResponses<IEnumerable<ConfNivelesPlantasCliente>>(confNivelesPlantasClienteDto);
            var respuesta = _historialCorreosService.GetHistorialCorreosContactos(codigoCliente, idElemento);
            return Ok(respuesta);
        }
    }
}
