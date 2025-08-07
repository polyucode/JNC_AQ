
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
using System.Globalization;
using AnalisisQuimicos.Core.QueryFilters;
using System.Net.Mail;
using System.Net;

namespace AnalisisQuimicos.Core.Services
{
    public class PDFGeneratorService : IPDFGeneratorService
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public PDFGeneratorService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task<int> NewPdf(List<ValorParametros> valores, string fechaRealizado, int idTarea, int archivos, int comentarioId, string comentario = "")
        {

            List<ValorParametros> valoresSorted = valores.OrderBy(x => x.Parametro).ThenBy(x => x.Id_Elemento).ToList();

            Clientes cliente = _unidadDeTrabajo.ClienteRepository.GetByCodigoCliente((int)valoresSorted[0].CodigoCliente).Result;
            Analisis analisis = _unidadDeTrabajo.AnalisisRepository.GetById((int)valoresSorted[0].Id_Analisis).Result;

            ElementosPlanta elemplanta = _unidadDeTrabajo.ElementosPlantaRepository.GetById((int)valoresSorted[0].Id_Elemento).Result;

            Usuarios usuario = _unidadDeTrabajo.UsuarioRepository.GetById((int)valoresSorted[0].Id_Operario).Result;

            ParametrosElementoQueryFilter filtro = new ParametrosElementoQueryFilter
            {
                CodigoCliente = cliente.Codigo,
                Oferta = valoresSorted[0].Oferta,
                Id_Elemento = elemplanta.Id,
                Id_Analisis = analisis.Id
            };

            IEnumerable<ParametrosElementoPlantaCliente> listParametro = _unidadDeTrabajo.ParametrosElementoPlantaClienteRepository.GetParameters(filtro);

            string nombreElemento = "";

            if (elemplanta.Descripcion != null)
            {
                nombreElemento = elemplanta.Nombre + " " + elemplanta.Descripcion;
            }
            else
            {
                nombreElemento = elemplanta.Nombre + " " + elemplanta.Numero;
            }

            nombreElemento = nombreElemento.Replace(" ", "_");
            nombreElemento = RemoveAccents(nombreElemento);

            string nombreAnalisis = analisis.Nombre.Replace(" ", "_");


            DateTime fecha = (DateTime)valoresSorted[0].Fecha;
            //DateTime fechaHecho = DateTime.Parse(fechaRealizado, null, DateTimeStyles.RoundtripKind);

            DateTime fechaHecho;
            if (!DateTime.TryParse(fechaRealizado, out fechaHecho))
            {
                fechaHecho = (DateTime)valoresSorted[0].Fecha;
            }

            string workingDirectory = Environment.CurrentDirectory;

            string path = Path.Combine(workingDirectory, "Pdf");
            path = Path.Combine(path, cliente.RazonSocial.Replace(",", " ").Replace(".", " ").TrimEnd());
            path = Path.Combine(path, valoresSorted[0].Oferta.ToString());
            path = Path.Combine(path, "Planta_" + cliente.RazonSocial.Replace(",", " ").Replace(".", " ").TrimEnd());
            path = Path.Combine(path, nombreElemento);
            path = Path.Combine(path, nombreAnalisis);

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            string nombreArchivo = "";

            if(archivos >= 1)
            {
                nombreArchivo = "M" + cliente.Codigo + "_" + fecha.ToString("yyyy-MM", CultureInfo.InvariantCulture) + "_" + analisis.Nombre + "_" + nombreElemento + "_Rev." + archivos + ".pdf";
            }
            else
            {
                nombreArchivo = "M" + cliente.Codigo + "_" + fecha.ToString("yyyy-MM", CultureInfo.InvariantCulture) + "_" + analisis.Nombre + "_" + nombreElemento + ".pdf";
            }
           

            path = Path.Combine(path, nombreArchivo);

            string resourcePath = Path.Combine(workingDirectory, @"Resources\", "Plantilla.html");

            string PaginaHTML_Texto = File.ReadAllText(resourcePath);

            string columnasElementos = "";
            string filasParametros = "";

            //int idElementoAnt = 0;
            //int idParamAnt = 0;

            string nombreParametro = "";


            //string nombreParametro = _unidadDeTrabajo.ParametrosRepository.GetById((int)valoresSorted[0].Parametro).Result.Nombre;
            string referencia = valoresSorted[0].Oferta.ToString();
            string metodo = valoresSorted[0].Metodo;
            string puntoMuestreo;
            if (!string.IsNullOrEmpty(valoresSorted[0].Referencia))
            {
                referencia += " - " + valoresSorted[0].Referencia;
            }


            foreach (ValorParametros valor in valoresSorted)
            {
                Parametros param = _unidadDeTrabajo.ParametrosRepository.GetById(valor.Parametro).Result;
                if (!param.EsCalculado)
                {
                    nombreParametro = _unidadDeTrabajo.ParametrosRepository.GetById((int)valor.Parametro).Result.Nombre;

                    ParametrosElementoPlantaCliente parametro = listParametro.Where(x => x.Parametro == valor.Parametro).FirstOrDefault();

                    decimal valorNumerico;

                    bool esNumerico = Decimal.TryParse(valor.Valor.Replace(".", ","), out valorNumerico);

                    if (esNumerico)
                    {
                        if (parametro.LimInf != 0 || parametro.LimSup != 0)
                        {
                            filasParametros += "<tr>";

                            if (valorNumerico < parametro.LimInf || valorNumerico > parametro.LimSup)
                            {
                                filasParametros += "<td style='color:red;'>" + nombreParametro + "</td>";
                                filasParametros += "<td style='color:red;'>" + valor.Unidad + "</td>";
                                filasParametros += "<td style='color:red;'>" + valor.Valor.Replace(".", ",") + "</td>";
                                filasParametros += "<td style='color:red;'>" + (parametro.LimInf % 1 == 0 ? parametro.LimInf.ToString("0") : parametro.LimInf.ToString("0.##")) + "</td>";
                                filasParametros += "<td style='color:red;'>" + (parametro.LimSup % 1 == 0 ? parametro.LimSup.ToString("0") : parametro.LimSup.ToString("0.##")) + "</td>";
                            }
                            else
                            {
                                filasParametros += "<td>" + nombreParametro + "</td>";
                                filasParametros += "<td>" + valor.Unidad + "</td>";
                                filasParametros += "<td>" + valor.Valor.Replace(".", ",") + "</td>";
                                filasParametros += "<td>" + (parametro.LimInf % 1 == 0 ? parametro.LimInf.ToString("0") : parametro.LimInf.ToString("0.##")) + "</td>";
                                filasParametros += "<td>" + (parametro.LimSup % 1 == 0 ? parametro.LimSup.ToString("0") : parametro.LimSup.ToString("0.##")) + "</td>";
                            }

                            filasParametros += "</tr>";
                        }
                        else
                        {
                            filasParametros += "<tr>";
                            filasParametros += "<td>" + nombreParametro + "</td>";
                            filasParametros += "<td>" + valor.Unidad + "</td>";
                            filasParametros += "<td>" + valor.Valor.Replace(".", ",") + "</td>";
                            filasParametros += "<td>" + (parametro.LimInf % 1 == 0 ? parametro.LimInf.ToString("0") : parametro.LimInf.ToString("0.##")) + "</td>";
                            filasParametros += "<td>" + (parametro.LimSup % 1 == 0 ? parametro.LimSup.ToString("0") : parametro.LimSup.ToString("0.##")) + "</td>";
                            filasParametros += "</tr>";
                        }
                    }
                    else
                    {
                        filasParametros += "<tr>";
                        filasParametros += "<td>" + nombreParametro + "</td>";
                        filasParametros += "<td>" + valor.Unidad + "</td>";
                        filasParametros += "<td></td>";
                        filasParametros += "<td>" + (parametro.LimInf % 1 == 0 ? parametro.LimInf.ToString("0") : parametro.LimInf.ToString("0.##")) + "</td>";
                        filasParametros += "<td>" + (parametro.LimSup % 1 == 0 ? parametro.LimSup.ToString("0") : parametro.LimSup.ToString("0.##")) + "</td>";
                        filasParametros += "</tr>";
                    }
                }
                else
                {
                    nombreParametro = _unidadDeTrabajo.ParametrosRepository.GetById((int)valor.Parametro).Result.Nombre;

                    ParametrosElementoPlantaCliente parametro = listParametro.Where(x => x.Parametro == valor.Parametro).FirstOrDefault();

                    filasParametros += "<tr>";
                    filasParametros += "<td>" + nombreParametro + "</td>";
                    filasParametros += "<td>" + valor.Unidad + "</td>";
                    filasParametros += "<td>" + DevolverValorParametroCalculado(parametro, valoresSorted) + "</td>";
                    filasParametros += "<td>" + "" + "</td>";
                    filasParametros += "<td>" + "" + "</td>";
                    filasParametros += "</tr>";
                }

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
            if (elemplanta.Descripcion != null)
            {
                PaginaHTML_Texto = PaginaHTML_Texto.Replace("@ELEPLANT", elemplanta.Nombre + " " + elemplanta.Descripcion);
            }
            else
            {
                PaginaHTML_Texto = PaginaHTML_Texto.Replace("@ELEPLANT", elemplanta.Nombre + " " + elemplanta.Numero);
            }

            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@REF", referencia);

            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@MET", metodo);

            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@REG", "");
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@FECHA", fechaHecho.ToString("dd/M/yyyy", CultureInfo.InvariantCulture));

            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@CLIENT", cliente.RazonSocial);
            //PaginaHTML_Texto = PaginaHTML_Texto.Replace("@EMPR", "");
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@DOMI", cliente.Direccion);
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@POBL", cliente.Poblacion);
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@TEL", cliente.Telefono);
            //PaginaHTML_Texto = PaginaHTML_Texto.Replace("@CONT", contactos.Nombre);
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@ANA", analisis.Nombre);

            string pathFirma = "";
            if ((int)usuario.Firma != 0)
            {
                Files file = _unidadDeTrabajo.FilesRepository.Download((int)usuario.Firma).Result;
                pathFirma = file.Path;
            }
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@Image", pathFirma);
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@Coment", comentario);


            using (FileStream stream = new FileStream(path, FileMode.Create))
            {
                //Creamos un nuevo documento y lo definimos como PDF
                Document pdfDoc = new Document(PageSize.A4, 25, 25, 25, 25);

                PdfWriter writer = PdfWriter.GetInstance(pdfDoc, stream);
                pdfDoc.Open();
                //pdfDoc.Add(new Phrase(""));

                string image = Path.Combine(workingDirectory, @"Resources\", "LogoNuevo.bmp");

                //Agregamos la imagen del banner al documento
                Image img = Image.GetInstance(image);
                img.ScaleToFit(120, 120);
                img.Alignment = Image.UNDERLYING;

                img.SetAbsolutePosition(10, 100);
                img.SetAbsolutePosition(pdfDoc.LeftMargin + 15, pdfDoc.Top - 40);
                pdfDoc.Add(img);

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

            Files newFile;

            if(comentarioId > 0)
            {
                newFile = new Files()
                {
                    Name = _nombre,
                    Format = _extension,
                    Path = path,
                    idTareaAnalisis = idTarea,
                    idComentario = comentarioId
                };
            }
            else
            {
                newFile = new Files()
                {
                    Name = _nombre,
                    Format = _extension,
                    Path = path,
                    idTareaAnalisis = idTarea,
                };
            }
            
            SendEmailToClient((int)valores[0].CodigoCliente, newFile);

            try
            {
                return await _unidadDeTrabajo.FilesRepository.Upload(newFile);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static string RemoveAccents(string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;

            string normalizedString = input.Normalize(NormalizationForm.FormD);
            StringBuilder stringBuilder = new StringBuilder();

            foreach (char c in normalizedString)
            {
                UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
        }

        private double DevolverValorParametroCalculado(ParametrosElementoPlantaCliente parametro, List<ValorParametros> listParametro)
        {
            var ltsParametro = _unidadDeTrabajo.ParametrosRepository.GetById((int)parametro.Parametro).Result;
            List<string> valoresCalculo = new List<string>();
            try
            {
                if (ltsParametro == null)
                {
                    return -1;
                }
                var indicesParamertosCalculo = ltsParametro.ParametrosCalculo.Split(';').ToList();
                foreach (var indiceCalculo in indicesParamertosCalculo)
                {
                    var valor = listParametro.Where(x => x.Parametro.ToString() == indiceCalculo.ToString()).FirstOrDefault();
                    if (valor != null)
                    {
                        valoresCalculo.Add(valor.Valor.Replace('.',','));
                    }
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return CalcularValorParametroCalculado(ltsParametro.IdParametroCalculado, valoresCalculo);
        }

        private double CalcularValorParametroCalculado(int idParametroCalculado, List<string> valoresParametrosCalculo)
        {
            double result = 0;
            switch (idParametroCalculado)
            {
                //PH SATURACION
                case 1:
                    result = CalcularPhSaturacion(valoresParametrosCalculo);
                    break;
                //PH EQ
                case 2:
                    result = CalcularPhEq(valoresParametrosCalculo);
                    break;
                //Índice de Puckorius
                case 3:
                    result = CalcularIndiceDePuckorius(valoresParametrosCalculo);
                    break;
                //Índice de Riznar
                case 4:
                    result = CalcularIndiceDeRiznar(valoresParametrosCalculo);
                    break;
                //Índice de Langelier
                case 5:
                    result = CalcularIndiceDeLangelier(valoresParametrosCalculo);
                    break;
                //Hidróxidos
                case 6:
                    result = CalcularHidroxidos(valoresParametrosCalculo);
                    break;
                //Carbonatos
                case 7:
                    result = CalcularCarbonatos(valoresParametrosCalculo);
                    break;
                // Bicarbonatos
                case 8:
                    result = CalcularBicarbonatos(valoresParametrosCalculo);
                    break;
                default:
                    break;
            }

            return Math.Round(result, 1);
        }

        private double CalcularBicarbonatos(List<string> valoresParametrosCalculo)
        {
            double result = 0;
            if (valoresParametrosCalculo.Count != 2)
            {
                return -100;
            }
            List<double> valoresNum;
            try
            {
                valoresNum = valoresParametrosCalculo
                    .Select(x => string.IsNullOrWhiteSpace(x) ? 0 : double.Parse(x))
                    .ToList();
            }
            catch (FormatException)
            {
                return -100;
            }

            var alcalinidadM = valoresNum[0];
            var alcalinidadP = valoresNum[1];

            if (alcalinidadM == 0 || alcalinidadP == 0)
            {
                return -100;
            }

            if (alcalinidadP == alcalinidadM)
            {
                result = 0;
            }
            else
            {
                if (alcalinidadP > (alcalinidadM / 2))
                {
                    result = 0;
                }
                else
                {
                    if (alcalinidadP == (alcalinidadM / 2))
                    {
                        result = 0;
                    }
                    else
                    {
                        if (alcalinidadP < (alcalinidadM / 2))
                        {
                            return alcalinidadM - 2 * alcalinidadP;
                        }
                        else
                        {
                            if (alcalinidadP == 0)
                            {
                                result = alcalinidadM;
                            }
                        }
                    }
                }
            }

            return result;
        }

        private double CalcularCarbonatos(List<string> valoresParametrosCalculo)
        {
            double result = 0;
            if (valoresParametrosCalculo.Count != 2)
            {
                return -100;
            }
            List<double> valoresNum;
            try
            {
                valoresNum = valoresParametrosCalculo
                    .Select(x => string.IsNullOrWhiteSpace(x) ? 0 : double.Parse(x))
                    .ToList();
            }
            catch (FormatException)
            {
                return -100;
            }

            var alcalinidadM = valoresNum[0];
            var alcalinidadP = valoresNum[1];

            if (alcalinidadM == 0 || alcalinidadP == 0)
            {
                return -100;
            }

            if (alcalinidadP == alcalinidadM)
            {
                result = 0;
            }
            else
            {
                if (alcalinidadP > (alcalinidadM / 2))
                {
                    result = 2 * (alcalinidadM - alcalinidadP);
                }
                else
                {
                    if (alcalinidadP == (alcalinidadM / 2))
                    {
                        result = alcalinidadM;
                    }
                    else
                    {
                        if (alcalinidadP < (alcalinidadM / 2))
                        {
                            result = 2 * alcalinidadP;
                        }
                        else
                        {
                            if (alcalinidadP == 0)
                            {
                                result = 0;
                            }
                        }
                    }
                }
            }
            return result;
        }

        private double CalcularHidroxidos(List<string> valoresParametrosCalculo)
        {
            double result = 0;
            if (valoresParametrosCalculo.Count != 2)
            {
                return -100;
            }
            List<double> valoresNum;
            try
            {
                valoresNum = valoresParametrosCalculo
                    .Select(x => string.IsNullOrWhiteSpace(x) ? 0 : double.Parse(x))
                    .ToList();
            }
            catch (FormatException)
            {
                return -100;
            }

            var alcalinidadM = valoresNum[0];
            var alcalinidadP = valoresNum[1];

            if (alcalinidadM == 0 || alcalinidadP == 0)
            {
                return -100;
            }

            if (alcalinidadM == alcalinidadP)
            {
                result = alcalinidadM;
            }
            else
            {
                if (alcalinidadP > (alcalinidadM / 2))
                {
                    result = 2 * alcalinidadP - alcalinidadM;
                }
                else
                {
                    if (alcalinidadP == (alcalinidadM / 2))
                    {
                        result = 0;
                    }
                    else
                    {
                        if (alcalinidadP < (alcalinidadM / 2))
                        {
                            result = 0;
                        }
                        else
                        {
                            if (alcalinidadP == 0)
                            {
                                result = 0;
                            }
                        }
                    }
                }
            }
            return result;
        }

        private double CalcularIndiceDeLangelier(List<string> valoresParametrosCalculo)
        {
            if (valoresParametrosCalculo.Count != 5)
            {
                return -100;
            }

            List<double> valoresNum;
            try
            {
                valoresNum = valoresParametrosCalculo
                    .Select(x => string.IsNullOrWhiteSpace(x) ? 0 : double.Parse(x))
                    .ToList();
            }
            catch (FormatException)
            {
                return -100;
            }
            var tds = valoresNum[1];
            var temperatura = valoresNum[2];
            var durezaCalcica = valoresNum[3];
            var alcalinidadM = valoresNum[4];

            var ph = valoresNum[0];

            var phSaturacion = CalcularPhSaturacion(new List<string>() { tds.ToString(), temperatura.ToString(), durezaCalcica.ToString(), alcalinidadM.ToString() });
            if (phSaturacion == -100 || ph == -100)
            {
                return -100;
            }
            return +ph - phSaturacion;
        }

        private double CalcularIndiceDeRiznar(List<string> valoresParametrosCalculo)
        {
            if (valoresParametrosCalculo.Count != 5)
            {
                return -100;
            }
            List<double> valoresNum;
            try
            {
                valoresNum = valoresParametrosCalculo
                    .Select(x => string.IsNullOrWhiteSpace(x) ? 0 : double.Parse(x))
                    .ToList();
            }
            catch (FormatException)
            {
                return -100;
            }
            var tds = valoresNum[0];
            var temperatura = valoresNum[1];
            var durezaCalcica = valoresNum[2];
            var alcalinidadM = valoresNum[3];

            var phSaturacion = CalcularPhSaturacion(new List<string>() { tds.ToString(), temperatura.ToString(), durezaCalcica.ToString(), alcalinidadM.ToString() });
            var ph = valoresNum[4];

            if (phSaturacion == -100 || ph == -100)
            {
                return -100;
            }

            return 2 * phSaturacion - ph;
        }

        private double CalcularIndiceDePuckorius(List<string> valoresParametrosCalculo)
        {
            if (valoresParametrosCalculo.Count != 4)
            {
                return -100;
            }
            List<double> valoresNum;
            try
            {
                valoresNum = valoresParametrosCalculo
                    .Select(x => string.IsNullOrWhiteSpace(x) ? 0 : double.Parse(x))
                    .ToList();
            }
            catch (FormatException)
            {
                return -100;
            }
            var tds = valoresNum[0];
            var temperatura = valoresNum[1];
            var durezaCalcica = valoresNum[2];
            var alcalinidadM = valoresNum[3];

            var phSaturacion = CalcularPhSaturacion(valoresParametrosCalculo);
            var phEq = CalcularPhEq(new List<string>() { valoresParametrosCalculo[3] });
            if (phSaturacion == -100 || phEq == -100)
            {
                return -100;
            }
            return 2 * phSaturacion - phEq; ;
        }

        private double CalcularPhEq(List<string> valoresParametrosCalculo)
        {
            if (valoresParametrosCalculo.Count != 1)
            {
                return -100;
            }
            List<double> valoresNum;
            try
            {
                valoresNum = valoresParametrosCalculo
                    .Select(x => string.IsNullOrWhiteSpace(x) ? 0 : double.Parse(x))
                    .ToList();
            }
            catch (FormatException)
            {
                return -100;
            }
            var alcalinidadM = valoresNum[0];
            if (alcalinidadM == 0)
            {
                return -100;
            }
            return 1.465 * Math.Log10(alcalinidadM) + 4.54;
        }

        private double CalcularPhSaturacion(List<string> valoresParametrosCalculo)
        {
            if (valoresParametrosCalculo.Count != 4)
            {
                return -100;
            }
            List<double> valoresNum;
            try
            {
                valoresNum = valoresParametrosCalculo
                    .Select(x => string.IsNullOrWhiteSpace(x) ? 0 : double.Parse(x))
                    .ToList();
            }
            catch (FormatException)
            {
                return -100;
            }
            var tds = valoresNum[0];
            var temperatura = valoresNum[1];
            var durezaCalcica = valoresNum[2];
            var alcalinidadM = valoresNum[3];
            return +(9.3 + (Math.Log10(tds) - 1) / 10) + (-13.12) * Math.Log10(temperatura + 273) + (34.55) - (Math.Log10(durezaCalcica) - 0.4 + Math.Log10(alcalinidadM));
        }

        private void SendEmailToClient(int codigoCliente, Files documentoPDF)
        {
            try
            {
                var clientes = _unidadDeTrabajo.ClientesContactosRepository.GetByCodigoCliente((int)codigoCliente);
                var correo = _unidadDeTrabajo.CorreosRepository.GetAll().FirstOrDefault();
                if (clientes != null && clientes.Count() > 0)
                {
                    foreach (var cliente in clientes)
                    {
                        if (cliente.Correo == null || (bool)!cliente.Correo || cliente.Deleted == true)
                        {
                            continue;
                        }
                        var fromAddress = new MailAddress(correo.Username, "Gemma");
                        var toAddress = new MailAddress(cliente.Email, cliente.Nombre);
                        //const string fromPassword = correo.Password;
                        string subject = "Pdf Anàlisis F/Q";
                        string body = "Benvolguts,\n\n\n\nAdjunt els hi fem arribar el següent informe F/Q.\n\n\n\nPer qualsevol dubte quedem a la seva disposició.\n\n\n\nGràcies";

                        var smtp = new SmtpClient
                        {
                            Host = "smtp.serviciodecorreo.es",
                            Port = 587,
                            DeliveryMethod = SmtpDeliveryMethod.Network,

                            UseDefaultCredentials = false,
                            Credentials = new NetworkCredential(fromAddress.Address, correo.Password),
                            EnableSsl = true
                        };
                        var email = new MailMessage(fromAddress, toAddress);
                        email.Body = body;
                        email.Subject = subject;
                        Attachment attachment = new Attachment(documentoPDF.Path);
                        email.Attachments.Add(attachment);
                        System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                        smtp.Send(email);
                    }
                }
                else
                {

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
