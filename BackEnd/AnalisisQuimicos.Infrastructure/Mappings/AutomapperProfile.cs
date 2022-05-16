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
            CreateMap<Perfiles, PerfilDto>().ReverseMap();
            CreateMap<Comarcas, ComarcaDto>().ReverseMap();
            CreateMap<Provincias, ProvinciaDto>().ReverseMap();
            CreateMap<Poblaciones, PoblacionDto>().ReverseMap();
            CreateMap<ElementosPlanta, ElementosPlantaDto>().ReverseMap();
            CreateMap<ServMantenimientoCab, ServMantenimientoCabDto>().ReverseMap();
            CreateMap<ServMantenimientoDet, ServMantenimientoDetDto>().ReverseMap();

            CreateMap<ConfNivelesPlantasCliente, ConfNivelesPlantasClienteDTO>().ReverseMap();
            CreateMap<ConfPlantasCliente, ConfPlantasClienteDTO>().ReverseMap();
            CreateMap<ParametrosElementoPlantaCliente, ParametrosElementoPlantaClienteDto>().ReverseMap();
            CreateMap<ClientesContactos, ClientesContactosDTO>().ReverseMap();
            CreateMap<OfertasClientes, OfertasClientesDTO>().ReverseMap();
            CreateMap<Productos, ProductosDTO>().ReverseMap();
            CreateMap<Consumos, ConsumosDTO>().ReverseMap();

        }

        
    }
}
