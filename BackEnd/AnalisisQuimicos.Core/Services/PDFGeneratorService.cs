using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using iTextSharp.text;
using System.IO;
using iTextSharp.text.pdf;
using iTextSharp.tool.xml;
using AnalisisQuimicos.Core.Interfaces;
using System.util;
using AnalisisQuimicos.Core.Entities;

namespace AnalisisQuimicos.Core.Services
{
    public class PDFGeneratorService : IPDFGeneratorService
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public PDFGeneratorService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task<string> NewPdf(List<ValorParametros> valores)
        {

            List<ValorParametros> valoresSorted = valores.OrderBy(x => x.Parametro).ThenBy(x => x.Id_Elemento).ToList();

            List<int> listaElementos = new List<int>();


            string workingDirectory = Environment.CurrentDirectory;

            string path = Path.Combine(workingDirectory, "Pdf");

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            path = Path.Combine(path, "unpdf.pdf");

            string resourcePath = Path.Combine(workingDirectory, @"Resources\", "Plantilla.html");

            string PaginaHTML_Texto = File.ReadAllText(resourcePath);

            string columnasElementos = "";
            string filasParametros = "";

            int idElementoAnt = 0;
            int idParamAnt = 0;

            string nombreParametro = "";

            foreach (ValorParametros valor in valoresSorted)
            {
                if (!listaElementos.Contains((int)valor.Id_Elemento))
                {
                    listaElementos.Add((int)valor.Id_Elemento);

                    string nombreElemento = _unidadDeTrabajo.ElementosRepository.GetById((int)valor.Id_Elemento).Result.Nombre;
                    columnasElementos += "<th>" + nombreElemento + "</th>";
                }
            }

            int posant;

            foreach (ValorParametros valor in valoresSorted)
            {

                if (idElementoAnt == 0)
                {
                    posant = 1;
                }
                else
                {
                    posant = listaElementos.IndexOf(idElementoAnt) + 1;
                }

                if (idParamAnt != valor.Parametro)
                {
                    nombreParametro = _unidadDeTrabajo.ParametrosRepository.GetById((int)valor.Parametro).Result.Nombre;

                    if (idParamAnt != 0)
                    {
                        for (int i = 0; i < (listaElementos.Count - posant); i++)
                        {
                            filasParametros += "<td></td>";
                        }

                        filasParametros += "<td></td>";
                        filasParametros += "</tr>";
                    }
                    filasParametros += "<tr>";
                    filasParametros += "<td>" + nombreParametro + "</td>";
                    filasParametros += "<td>" + valor.Unidad + "</td>";

                    posant = 1;
                }
                else
                {
                    posant += 1;
                }

                idParamAnt = (int)valor.Parametro;

                int pos = listaElementos.IndexOf((int)valor.Id_Elemento) + 1;

                for (int i = 0; i < (pos - posant); i++)
                {
                    filasParametros += "<td></td>";
                }

                filasParametros += "<td>" + valor.Valor + "</td>";

                idElementoAnt = (int)valor.Id_Elemento;
            }

            if (idElementoAnt == 0)
            {
                posant = 1;
            }
            else
            {
                posant = listaElementos.IndexOf(idElementoAnt) + 1;
            }

            for (int i = 0; i < (listaElementos.Count - posant); i++)
            {
                filasParametros += "<td></td>";
            }

            filasParametros += "<td></td>";
            filasParametros += "</tr>";

            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@COLUMNAS", columnasElementos);
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@FILAS", filasParametros);



            using (FileStream stream = new FileStream(path, FileMode.Create))
            {
                //Creamos un nuevo documento y lo definimos como PDF
                Document pdfDoc = new Document(PageSize.A4, 25, 25, 25, 25);

                PdfWriter writer = PdfWriter.GetInstance(pdfDoc, stream);
                pdfDoc.Open();
                //pdfDoc.Add(new Phrase(""));

                //Agregamos la imagen del banner al documento
                //iTextSharp.text.Image img = iTextSharp.text.Image.GetInstance(Properties.Resources.shop, System.Drawing.Imaging.ImageFormat.Png);
                //img.ScaleToFit(60, 60);
                //img.Alignment = iTextSharp.text.Image.UNDERLYING;

                //img.SetAbsolutePosition(10,100);
                //img.SetAbsolutePosition(pdfDoc.LeftMargin, pdfDoc.Top - 60);
                //pdfDoc.Add(img);


                //pdfDoc.Add(new Phrase("Hola Mundo"));
                using (StringReader sr = new StringReader(PaginaHTML_Texto))
                {
                    XMLWorkerHelper.GetInstance().ParseXHtml(writer, pdfDoc, sr);
                }

                pdfDoc.Close();
                stream.Close();
            }

            return path;
        }
    }
}
