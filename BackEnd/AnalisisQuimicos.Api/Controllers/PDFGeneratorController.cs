using AnalisisQuimicos.Core.DTOs;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PDFGeneratorController : ControllerBase
    {
        private readonly IPDFGeneratorService _pdfGenerator;
        private readonly IMapper _mapper;

        public PDFGeneratorController(IMapper mapper, IPDFGeneratorService pdfGenerator)
        {
            _pdfGenerator = pdfGenerator;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> NewPdf(List<ValorParametrosDTO> valoresDto)
        {
            var valores = _mapper.Map<List<ValorParametros>>(valoresDto);

            string path = await _pdfGenerator.NewPdf(valores);

            FileContentResult _fileContent;

            try
            {
                // Descargamos el archivo del Servidor.
                _fileContent = new FileContentResult(System.IO.File.ReadAllBytes(path), "application/octet-stream");
                _fileContent.FileDownloadName = "unpdf.pdf";

                return _fileContent;
            }
            catch
            {
                return Ok("ERROR AL DESCARGAR EL PDF");
            }
        }

    }
}
