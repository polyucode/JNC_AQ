using AnalisisQuimicos.Api.Responses;
using AnalisisQuimicos.Core.DTOs;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.QueryFilters;
using AnalisisQuimicos.Infrastructure.Data;
using AnalisisQuimicos.Infrastructure.Interfaces;
using AnalisisQuimicos.Infrastructure.Repositories;
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
    public class UsuarioController : ControllerBase
    {

        private readonly IUsuarioService _usuarioService;
        private readonly IPasswordService _passwordService;
        private readonly IMapper _mapper;
        private readonly YucodeDevelopmentJNC_AQContext _db;


        public UsuarioController(YucodeDevelopmentJNC_AQContext db, IUsuarioService usuarioServicey,IMapper mapper, IPasswordService passwordService) 
        {
            _usuarioService = usuarioServicey;
            _mapper = mapper;
            _passwordService = passwordService;
            _db = db;
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
            var usuarioExistente = await _usuarioService.GetUsuario(id);
            if (usuarioExistente == null)
            {
                return NotFound(new ApiResponses<string>("Usuario no encontrado"));
            }

            usuarioExistente.Nombre = usuarioDto.Nombre;
            usuarioExistente.Apellidos = usuarioDto.Apellidos;
            usuarioExistente.Telefono = usuarioDto.Telefono;
            usuarioExistente.Usuario = usuarioDto.Usuario;
            usuarioExistente.Activo = usuarioDto.Activo;
            usuarioExistente.Firma = usuarioDto.Firma;
            usuarioExistente.IdPerfil = usuarioDto.IdPerfil;
            usuarioExistente.IdCliente = usuarioDto.IdCliente;
            usuarioExistente.CodigoOperario = usuarioDto.CodigoOperario;

            // Si la contraseña no está vacía, hashearla y actualizarla
            if (!string.IsNullOrEmpty(usuarioDto.Password))
            {
                usuarioExistente.Password = _passwordService.Hash(usuarioDto.Password);
            }

            // Actualizar usuario
            var result = await _usuarioService.UpdateUsuario(usuarioExistente);
            var response = new ApiResponses<bool>(result);
            return Ok(response);
        }
         
        [HttpDelete ("{id}")]
        public IActionResult DeleteUsuario(int id)
         {
            try
            {
                var usuario = _db.GesUsuarios.FirstOrDefault(x => x.Id == id && x.Deleted != true);
                if (usuario == null)
                {
                    return NotFound();
                }

                usuario.Deleted = true;

                _db.SaveChanges();

                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
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
