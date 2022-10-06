using AnalisisQuimicos.Api.Responses;
using AnalisisQuimicos.Core.DTOs;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.QueryFilters;
using AnalisisQuimicos.Infrastructure.Interfaces;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AnalisisQuimicos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly IPasswordService _passwordService;
        private readonly IMapper _mapper;

        public AuthController(IUsuarioService usuarioServicey, IMapper mapper, IPasswordService passwordService)
        {
            _usuarioService = usuarioServicey;
            _mapper = mapper;
            _passwordService = passwordService;
        }

        [HttpGet("register")]
        public async Task<IActionResult> Register()
        {
            return Ok("Success");
        }


    }
}
