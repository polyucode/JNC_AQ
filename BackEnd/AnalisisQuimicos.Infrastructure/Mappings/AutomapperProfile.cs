using AnalisisQuimicos.Core.DTOs;
using AnalisisQuimicos.Core.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Mappings
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<Usuarios, UsuarioDto>().ReverseMap();
            CreateMap<Clientes, ClienteDto>().ReverseMap();
            CreateMap<ElementosPlanta, ElementosPlantaDto>().ReverseMap();
            CreateMap<ServMantenimientoCab, ServMantenimientoCabDto>().ReverseMap();
            CreateMap<ServMantenimientoDet, ServMantenimientoDetDto>().ReverseMap();

        }

        
    }
}
