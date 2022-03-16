using AnalisisQuimicos.Api.Responses;
using AnalisisQuimicos.Core.DTOs;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.QueryFilters;
using AnalisisQuimicos.Infrastructure.Interfaces;
using AnalisisQuimicos.Infrastructure.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Api.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {

        private readonly IUsuarioService _usuarioService;
        private readonly IPasswordService _passwordService;
        private readonly IMapper _mapper;


        public UsuarioController(IUsuarioService usuarioServicey,IMapper mapper, IPasswordService passwordService) 
        {
            _usuarioService = usuarioServicey;
            _mapper = mapper;
            _passwordService = passwordService;
        }

        [HttpGet]
        public IActionResult GetUsuarios([FromQuery]UsuariosQueryFilter filtro)
        { 
            var usuarios =  _usuarioService.GetUsuarios(filtro);
            var usuariosDto = _mapper.Map<IEnumerable<UsuarioDto>>(usuarios);
            var response = new ApiResponses<IEnumerable<UsuarioDto>>(usuariosDto);
            return Ok(response);
        }

        [HttpGet ("{id}")]
        public async Task<IActionResult> GetUsuario(int id)
        
        {
            var usuario = await _usuarioService.GetUsuario(id);
            var usuarioDto = _mapper.Map<UsuarioDto>(usuario);
            var response = new ApiResponses<UsuarioDto>(usuarioDto);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> PostUsuario(UsuarioDto usuarioDto)
        {
            var usuario = _mapper.Map<Usuarios>(usuarioDto);

            usuario.Password = _passwordService.Hash(usuario.Password);

            await _usuarioService.InsertUsuario(usuario);

            usuarioDto = _mapper.Map<UsuarioDto>(usuario);
            var response = new ApiResponses<UsuarioDto>(usuarioDto);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> PutUsuario(int id,UsuarioDto usuarioDto)
        {
            var usuario = _mapper.Map<Usuarios>(usuarioDto);
             
            var result = await _usuarioService.UpdateUsuario(usuario);
            var response = new ApiResponses<bool>(result);
            return Ok(response);
        }
         
        [HttpDelete ("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
         {
            var result = await _usuarioService.DeleteUsuario(id);
            var response = new ApiResponses<bool>(result);
            return Ok(response);
        }

        //[HttpPost]
        //public async Task<IActionResult> Register(UsuarioDto usuarioDto)
        //{
        //    var usuario = _mapper.Map<Usuarios>(usuarioDto);

        //    await _usuarioService.RegisterUser(usuario);

        //    usuarioDto = _mapper.Map<UsuarioDto>(usuario);
        //    var response = new ApiResponses<UsuarioDto>(usuarioDto);
        //    return Ok(Response);
        //}
    }
}
