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
    public class FilesController : ControllerBase
    {
        private readonly IRepository<Files> _filesService;
        private readonly IMapper _mapper;


        public FilesController(IRepository<Files> filesService, IMapper mapper)
        {
            _filesService = filesService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var files = _filesService.GetAll();
            var filesDto = _mapper.Map<IEnumerable<Files>>(files);
            var response = new ApiResponses<IEnumerable<Files>>(filesDto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)

        {
            var file = await _filesService.GetById(id);
            var fileDto = _mapper.Map<FilesDTO>(file);
            var response = new ApiResponses<FilesDTO>(fileDto);
            return Ok(response);
        }                
    }
}
