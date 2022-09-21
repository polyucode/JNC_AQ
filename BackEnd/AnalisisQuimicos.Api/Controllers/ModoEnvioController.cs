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
    public class ModoEnvioController : ControllerBase
    {
        private readonly IRepository<ModoEnvio> _modoEnvioService;
        private readonly IMapper _mapper;

        public ModoEnvioController(IRepository<ModoEnvio> enviosService, IMapper mapper)
        {
            _modoEnvioService = enviosService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var envios = _modoEnvioService.GetAll();
            var enviosDTO = _mapper.Map<IEnumerable<ModoEnvioDTO>>(envios);
            var response = new ApiResponses<IEnumerable<ModoEnvioDTO>>(enviosDTO);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var envio = await _modoEnvioService.GetById(id);
            var envioDTO = _mapper.Map<ModoEnvioDTO>(envio);
            var response = new ApiResponses<ModoEnvioDTO>(envioDTO);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ModoEnvioDTO EnviosDTO)
        {
            var envio = _mapper.Map<ModoEnvio>(EnviosDTO);
            await _modoEnvioService.Add(envio);

            EnviosDTO = _mapper.Map<ModoEnvioDTO>(envio);
            var response = new ApiResponses<ModoEnvioDTO>(EnviosDTO);
            return Ok(response);
        }

        [HttpPut]
        public void Update(int id, ModoEnvioDTO EnviosDTO)
        {
            var envio = _mapper.Map<ModoEnvio>(EnviosDTO);

            _modoEnvioService.Update(envio);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {

            await _modoEnvioService.Delete(id);

        }
    }
}
