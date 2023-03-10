using AnalisisQuimicos.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Interfaces
{
    public interface IPDFGeneratorService
    {
        Task<string> NewPdf(List<ValorParametros> valores);
    }
}
