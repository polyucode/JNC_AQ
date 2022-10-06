using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Exceptions;
using AnalisisQuimicos.Core.Interfaces;
using AnalisisQuimicos.Core.QueryFilters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class UsuarioService : IUsuarioService 
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public UsuarioService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task<bool> DeleteUsuario(int id)
        {
             await _unidadDeTrabajo.UsuarioRepository.Delete(id);
             await _unidadDeTrabajo.SaveChangesAsync();

            return true;
        }

        public async Task<Usuarios> GetUsuario(int id)
        {
            return await _unidadDeTrabajo.UsuarioRepository.GetById(id);
        }

        public  IEnumerable<Usuarios> GetUsuarios(UsuariosQueryFilter filtro)
        {
            var usuarios = _unidadDeTrabajo.UsuarioRepository.GetAll();
            if(filtro.Nombre != null)
            {
                usuarios = usuarios.Where(x => x.Nombre.ToLower().Contains(filtro.Nombre.ToLower()));
            }
            if(filtro.Apellidos != null)
            {
                usuarios = usuarios.Where(x => x.Apellidos.ToLower().Contains(filtro.Apellidos.ToLower()));
            }
            if (filtro.Telefono != null)
            {
                usuarios = usuarios.Where(x => x.Telefono.ToLower().Contains(filtro.Telefono.ToLower()));
            }
            //if(filtro.Date != null)
            //{
            //    usuarios = usuarios.Where(x => x.AddDate.ToShortDateString() == filtro.Date?.ToShortDateString());

            //}
            if (filtro.IdPerfil != null)
            {
                usuarios = usuarios.Where(x => x.IdPerfil == filtro.IdPerfil);
            }
            return usuarios;
        }

        public async Task InsertUsuario(Usuarios usuario)
        {
            if (usuario.Nombre == "NoPermitir")
            {
                throw new BussinesException("No se puede añadir un usuario con ese nombre");
            }
            await _unidadDeTrabajo.UsuarioRepository.Add(usuario);
            await _unidadDeTrabajo.SaveChangesAsync();

        }

        public async Task<bool> UpdateUsuario(Usuarios usuario)
        {
            _unidadDeTrabajo.UsuarioRepository.Update(usuario);
            await _unidadDeTrabajo.SaveChangesAsync();
            return true;
        } 

        public async Task<Usuarios> GetLoginByCredentials(UserLogin userLogin)
        {
            return await _unidadDeTrabajo.UsuarioRepository.GetLoginByCredentials(userLogin);
        }

        public async Task RegisterUser(Usuarios usuario)
        {
            await _unidadDeTrabajo.UsuarioRepository.Add(usuario);
            await _unidadDeTrabajo.SaveChangesAsync();
        }
    }
}
