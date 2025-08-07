using AnalisisQuimicos.Core.DTOs;
using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using AnalisisQuimicos.Infrastructure.Data;

namespace AnalisisQuimicos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PDFGeneratorController : ControllerBase
    {
        private readonly IPDFGeneratorService _pdfGenerator;
        private readonly IMapper _mapper;
        private readonly YucodeDevelopmentJNC_AQContext _db;

        public PDFGeneratorController(YucodeDevelopmentJNC_AQContext db, IMapper mapper, IPDFGeneratorService pdfGenerator)
        {
            _db = db;
            _pdfGenerator = pdfGenerator;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> NewPdf(PDFGeneratorObject pdfGeneratorObject)
        {
            List<ValorParametrosDTO> valoresDto = pdfGeneratorObject.ValoresParametros;
            var valores = _mapper.Map<List<ValorParametros>>(valoresDto);
            int comentarioId = 0;
            string comentario = "";
            if(pdfGeneratorObject.idComentario != 0)
            {
                comentarioId = pdfGeneratorObject.idComentario;
                comentario = pdfGeneratorObject.Comentario;
            }
            
            string fechaRealizado = pdfGeneratorObject.FechaRealizado;
            int idTarea = pdfGeneratorObject.idTarea;
            var archivos = _db.GesFiles.Where(x => x.idTareaAnalisis == idTarea).Count();

            int idFile = await _pdfGenerator.NewPdf(valores, fechaRealizado, idTarea, archivos, comentarioId, comentario);

            return Ok(idFile);

            //FileContentResult _fileContent;

            /*try
            {
                // Descargamos el archivo del Servidor.
                _fileContent = new FileContentResult(System.IO.File.ReadAllBytes(path), "application/octet-stream");
                _fileContent.FileDownloadName = "unpdf.pdf";

                return _fileContent;
            }
            catch
            {
                return Ok("ERROR AL DESCARGAR EL PDF");
            }*/
        }

    }
    public class PDFGeneratorObject
    {
        public int idComentario { get; set; }
        public string Comentario { get; set; }
        public List<ValorParametrosDTO> ValoresParametros { get; set; }
        public string FechaRealizado { get; set; }
        public int idTarea { get; set; }
    }
}
