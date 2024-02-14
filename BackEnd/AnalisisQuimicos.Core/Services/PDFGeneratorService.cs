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

        public async Task<int> NewPdf(List<ValorParametros> valores)
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
                nombreElemento = elemplanta.Nombre + "_" + elemplanta.Descripcion;
            }
            else
            {
                nombreElemento = elemplanta.Nombre + "_" + elemplanta.Numero;
            }
            

            DateTime fecha = (DateTime)valoresSorted[0].Fecha;

            string workingDirectory = Environment.CurrentDirectory;

            string path = Path.Combine(workingDirectory, "Pdf");
            path = Path.Combine(path, cliente.RazonSocial);
            path = Path.Combine(path, valoresSorted[0].Oferta.ToString());
            path = Path.Combine(path, "Planta_" + elemplanta.Numero.ToString());
            path = Path.Combine(path, nombreElemento);

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            string nombreArchivo = "M" + cliente.Codigo + "_" + fecha.ToString("yyyy-MM", CultureInfo.InvariantCulture) + "_" + analisis.Nombre + "_" + nombreElemento + ".pdf";

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
            if (!string.IsNullOrEmpty(valoresSorted[0].Referencia))
            {
                referencia += " - " + valoresSorted[0].Referencia;
            }


            foreach (ValorParametros valor in valoresSorted)
            {
                nombreParametro = _unidadDeTrabajo.ParametrosRepository.GetById((int)valor.Parametro).Result.Nombre;

                ParametrosElementoPlantaCliente parametro = listParametro.Where(x => x.Parametro == valor.Parametro).ToArray()[0];

                filasParametros += "<tr>";
                filasParametros += "<td>" + nombreParametro + "</td>";
                filasParametros += "<td>" + valor.Unidad + "</td>";
                filasParametros += "<td>" + valor.Valor + "</td>";
                filasParametros += "<td>" + parametro.LimInf + "</td>";
                filasParametros += "<td>" + parametro.LimSup + "</td>";
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
            if(elemplanta.Descripcion != null)
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
            PaginaHTML_Texto = PaginaHTML_Texto.Replace("@FECHA", fecha.ToString("dd/M/yyyy", CultureInfo.InvariantCulture));

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

        private void SendEmailToClient(int codigoCliente, Files documentoPDF)
        {
            try
            {
                var clientes = _unidadDeTrabajo.ClientesContactosRepository.GetByCodigoCliente((int)codigoCliente);
                foreach (var cliente in clientes)
                {
                    if ((bool)!cliente.Correo)
                    {
                        continue;
                    }
                    var fromAddress = new MailAddress("gemma@jnegre.com", "Gemma");
                    var toAddress = new MailAddress(cliente.Email, cliente.Nombre);
                    const string fromPassword = "G3mm42022";
                    string subject = "Pdf Físico-Químico";
                    string body = "";

                    var smtp = new SmtpClient
                    {
                        Host = "smtp.serviciodecorreo.es",
                        Port = 587,
                        DeliveryMethod = SmtpDeliveryMethod.Network,

                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential(fromAddress.Address, fromPassword),
                        EnableSsl = true
                    };
                    var email = new MailMessage(fromAddress, toAddress);
                    email.Body = body;
                    email.Subject = subject;
                    Attachment attachment = new Attachment(documentoPDF.Path);
                    email.Attachments.Add(attachment);

                    //using (var message = new MailMessage(fromAddress, toAddress)
                    //{
                    //    Subject = subject,
                    //    Body = body
                    //})
                    //{
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                    smtp.Send(email);
                    //}
                }


            }
            catch (Exception ex)
            {

            }
        }
    }
}
