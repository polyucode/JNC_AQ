﻿using System;
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
using System.Globalization;

namespace AnalisisQuimicos.Core.Services
{
    public class PDFGeneratorService : IPDFGeneratorService
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public PDFGeneratorService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task<int> NewPdf(List<ValorParametros> valores)
        {

            List<ValorParametros> valoresSorted = valores.OrderBy(x => x.Parametro).ThenBy(x => x.Id_Elemento).ToList();

            Clientes cliente = _unidadDeTrabajo.ClienteRepository.GetByCodigoCliente((int)valoresSorted[0].CodigoCliente).Result;
            Analisis analisis = _unidadDeTrabajo.AnalisisRepository.GetById((int)valoresSorted[0].Id_Analisis).Result;

            ElementosPlanta elemplanta = _unidadDeTrabajo.ElementosPlantaRepository.GetById((int)valoresSorted[0].Id_Elemento).Result;
            string nombreElemento = elemplanta.Nombre;

            DateTime fecha = (DateTime)valoresSorted[0].Fecha;

            string workingDirectory = Environment.CurrentDirectory;

            string path = Path.Combine(workingDirectory, "Pdf");
            path = Path.Combine(path, cliente.RazonSocial);
            path = Path.Combine(path, valoresSorted[0].Oferta.ToString());
            path = Path.Combine(path, elemplanta.Numero.ToString());
            path = Path.Combine(path, nombreElemento);

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            string nombreArchivo = cliente.RazonSocial + "_" + valoresSorted[0].Oferta + "_" + nombreElemento + "_" + analisis.Nombre + "_" + fecha.ToString("ddMyyyy", CultureInfo.InvariantCulture) + ".pdf";

            path = Path.Combine(path, nombreArchivo);

            string resourcePath = Path.Combine(workingDirectory, @"Resources\", "Plantilla.html");

            string PaginaHTML_Texto = File.ReadAllText(resourcePath);

            string columnasElementos = "";
            string filasParametros = "";

            //int idElementoAnt = 0;
            //int idParamAnt = 0;

            string nombreParametro = "";


            //string nombreParametro = _unidadDeTrabajo.ParametrosRepository.GetById((int)valoresSorted[0].Parametro).Result.Nombre;
            string referencia = valoresSorted[0].Referencia;


            foreach (ValorParametros valor in valoresSorted)
            {
                nombreParametro = _unidadDeTrabajo.ParametrosRepository.GetById((int)valor.Parametro).Result.Nombre;

                filasParametros += "<tr>";
                filasParametros += "<td>" + nombreParametro + "</td>";
                filasParametros += "<td>" + valor.Unidad + "</td>";
                filasParametros += "<td>" + valor.Valor + "</td>";
                filasParametros += "<td></td>";
                filasParametros += "<td></td>";
                filasParametros += "</tr>";


                /*if (!listaElementos.Contains((int)valor.Id_Elemento))
                {
                    listaElementos.Add((int)valor.Id_Elemento);

                    string nombreElemento = _unidadDeTrabajo.ElementosRepository.GetById((int)valor.Id_Elemento).Result.Nombre;
                    columnasElementos += "<th>" + nombreElemento + "</th>";
                }*/



            }

            //int posant;

            /*foreach (ValorParametros valor in valoresSorted)
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
            }*/

            /*if (idElementoAnt == 0)
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
            filasParametros += "</tr>";*/

            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@COLUMNAS", columnasElementos);
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@FILAS", filasParametros);
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@ELEPLANT", nombreElemento);
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@REF", referencia);

            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@REG", "");
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@FECHA", fecha.ToString("dd/M/yyyy", CultureInfo.InvariantCulture));

            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@CLIENT", cliente.RazonSocial);
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@EMPR", "");
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@DOMI", cliente.Direccion);
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@POBL", cliente.Poblacion);
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@TEL", cliente.Telefono);
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@CONT", "");


            using (FileStream stream = new FileStream(path, FileMode.Create))
            {
                //Creamos un nuevo documento y lo definimos como PDF
                Document pdfDoc = new Document(PageSize.A4, 25, 25, 25, 25);

                PdfWriter writer = PdfWriter.GetInstance(pdfDoc, stream);
                pdfDoc.Open();
                //pdfDoc.Add(new Phrase(""));

                string image = Path.Combine(workingDirectory, @"Resources\", "Logo.bmp");

                //Agregamos la imagen del banner al documento
                Image img = Image.GetInstance(image);
                img.ScaleToFit(120, 120);
                img.Alignment = Image.UNDERLYING;

                img.SetAbsolutePosition(10,100);
                img.SetAbsolutePosition(pdfDoc.LeftMargin + 15, pdfDoc.Top - 60);
                pdfDoc.Add(img);


                //pdfDoc.Add(new Phrase("Hola Mundo"));
                using (StringReader sr = new StringReader(PaginaHTML_Texto))
                {
                    XMLWorkerHelper.GetInstance().ParseXHtml(writer, pdfDoc, sr);
                }

                pdfDoc.Close();
                stream.Close();
            }

            int indiceDelUltimoPunto = nombreArchivo.LastIndexOf('.');

            string _nombre = nombreArchivo.Substring(0, indiceDelUltimoPunto);
            string _extension = nombreArchivo.Substring(indiceDelUltimoPunto + 1, nombreArchivo.Length - indiceDelUltimoPunto - 1);

            Files newFile = new Files()
            {
                Name = _nombre,
                Format = _extension,
                Path = path
            };

            try
            {
                return await _unidadDeTrabajo.FilesRepository.Upload(newFile);
            }
            catch (Exception e)
            {
                throw e;
            }


        }
    }
}
