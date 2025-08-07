using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IElementosPlantaExtra
    {
        Task<string> GetIconoElementoPlanta(int idElemento);
        Task<string> SubirIconoElemento(int idElemento, IFormFile file);
        void EliminarIconoElementoPlanta(int idElemento);
    }
}
