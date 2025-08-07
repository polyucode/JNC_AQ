using AnalisisQuimicos.Core.Entities;
using AnalisisQuimicos.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Services
{
    public class FileUploadService : IFileUploadService
    {
        private readonly IUnidadDeTrabajo _unidadDeTrabajo;

        public FileUploadService(IUnidadDeTrabajo unidadDeTrabajo)
        {
            _unidadDeTrabajo = unidadDeTrabajo;
        }

        public async Task<int> Upload(IFormFile file, string mode, int id)
        {

            ParametrosAnalisisPlanta tarea = _unidadDeTrabajo.ParametrosAnalisisPlantaRepository.GetById(id).Result;
            
            Analisis analisis = _unidadDeTrabajo.AnalisisRepository.GetById(tarea.Analisis).Result;

            string nombreElemento = tarea.NombreElemento.Replace(" ", "_");
            string nombreAnalisis = analisis.Nombre.Replace(" ", "_");

            string workingDirectory = Environment.CurrentDirectory;

            string path = Path.Combine(workingDirectory, "Pdf");
            path = Path.Combine(path, tarea.NombreCliente.Replace(",", " ").Replace(".", " ").TrimEnd());
            path = Path.Combine(path, tarea.Oferta.ToString());
            path = Path.Combine(path, "Planta_" + tarea.NombreCliente.Replace(",", " ").Replace(".", " ").TrimEnd());
            path = Path.Combine(path, nombreElemento);
            path = Path.Combine(path, nombreAnalisis);

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            path = Path.Combine(path, file.FileName);

            using (Stream fileStream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
                fileStream.Close();
            }

            int indiceDelUltimoPunto = file.FileName.LastIndexOf('.');

            string _nombre = file.FileName.Substring(0, indiceDelUltimoPunto);
            string _extension = file.FileName.Substring(indiceDelUltimoPunto + 1, file.FileName.Length - indiceDelUltimoPunto - 1);

            Files newFile = new Files()
            {
                Name = _nombre,
                Format = _extension,
                Path = path
            };


            try
            {
                await _unidadDeTrabajo.FilesRepository.Upload(newFile);

                tarea.Pdf = newFile.Id;

                _unidadDeTrabajo.ParametrosAnalisisPlantaRepository.Update(tarea);

                return newFile.Id;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<int> UploadFiles(IFormFile file, string mode, int id)
        {

            string workingDirectory = Environment.CurrentDirectory;

            string path = Path.Combine(workingDirectory, "Archivos");

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            path = Path.Combine(path, file.FileName);

            using (Stream fileStream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
                fileStream.Close();
            }

            int indiceDelUltimoPunto = file.FileName.LastIndexOf('.');

            string _nombre = file.FileName.Substring(0, indiceDelUltimoPunto);
            string _extension = file.FileName.Substring(indiceDelUltimoPunto + 1, file.FileName.Length - indiceDelUltimoPunto - 1);

            Files newFile = new Files()
            {
                Name = _nombre,
                Format = _extension,
                Path = path
            };

            try
            {
                await _unidadDeTrabajo.FilesRepository.Upload(newFile);

                Usuarios usuarios = _unidadDeTrabajo.UsuarioRepository.GetById(id).Result;

                usuarios.Firma = newFile.Id;

                _unidadDeTrabajo.UsuarioRepository.Update(usuarios);

                return newFile.Id;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<int> UploadTask(IFormFile file, string mode, int id)
        {

            Tareas tarea = _unidadDeTrabajo.TareasRepository.GetById(id).Result;

            Analisis analisis = _unidadDeTrabajo.AnalisisRepository.GetById(tarea.Analisis).Result;

            ElementosPlanta elemento = _unidadDeTrabajo.ElementosPlantaRepository.GetById(tarea.Elemento).Result;

            string nombreElemento = "";

            if (elemento.Descripcion != null)
            {
                nombreElemento = elemento.Nombre + " " + elemento.Descripcion;
            }
            else
            {
                nombreElemento = elemento.Nombre + " " + elemento.Numero;
            }

            nombreElemento = nombreElemento.Replace(" ", "_");
            nombreElemento = RemoveAccents(nombreElemento);

            string nombreAnalisis = analisis.Nombre.Replace(" ", "_");

            string workingDirectory = Environment.CurrentDirectory;

            string path = Path.Combine(workingDirectory, "Pdf");
            path = Path.Combine(path, tarea.NombreCliente.Replace(",", " ").Replace(".", " ").TrimEnd());
            path = Path.Combine(path, tarea.Oferta.ToString());
            path = Path.Combine(path, "Planta_" + tarea.NombreCliente.Replace(",", " ").Replace(".", " ").TrimEnd());
            path = Path.Combine(path, nombreElemento);
            path = Path.Combine(path, nombreAnalisis);

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            path = Path.Combine(path, file.FileName);

            using (Stream fileStream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
                fileStream.Close();
            }

            int indiceDelUltimoPunto = file.FileName.LastIndexOf('.');

            string _nombre = file.FileName.Substring(0, indiceDelUltimoPunto);
            string _extension = file.FileName.Substring(indiceDelUltimoPunto + 1, file.FileName.Length - indiceDelUltimoPunto - 1);

            Files newFile = new Files()
            {
                Name = _nombre,
                Format = _extension,
                Path = path
            };

            try
            {
                await _unidadDeTrabajo.FilesRepository.UploadTask(newFile);

                return newFile.Id;
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

        public async Task<bool> SendEmailToClientNoFQ(int codigoCliente, IFormFile documentoPDF, string texto, int tipoAnalisis, string contactosString, int idElemento)
        {
            try
            {
                var contactos = _unidadDeTrabajo.ClientesContactosRepository.GetByCodigoCliente(codigoCliente);
                var correo = _unidadDeTrabajo.CorreosRepository.GetAll().FirstOrDefault();
                var analisis = _unidadDeTrabajo.AnalisisRepository.GetById(tipoAnalisis).Result;

                if (string.IsNullOrEmpty(contactosString))
                {
                    return true;
                }

                var emailsContactosEnviarCorreo = contactosString.Split(";", StringSplitOptions.RemoveEmptyEntries);

                if (emailsContactosEnviarCorreo.Length == 0)
                {
                    return true;
                }

                byte[] pdfBytes;
                using (var memoryStream = new MemoryStream())
                {
                    await documentoPDF.CopyToAsync(memoryStream);
                    pdfBytes = memoryStream.ToArray();
                }

                string fileName = documentoPDF.FileName;
                string contentType = documentoPDF.ContentType;

                foreach (var email in emailsContactosEnviarCorreo)
                {
                    string emailEnviar = "";
                    string nombreContacto = "";
                    var contacto = contactos.FirstOrDefault(x => x.Email.Equals(email, StringComparison.OrdinalIgnoreCase));

                    if (contacto != null)
                    {
                        if (contacto.Deleted == true)
                        {
                            continue;
                        }
                        if (!(bool)contacto.Correo)
                        {
                            continue;
                        }
                        emailEnviar = contacto.Email;
                        nombreContacto = contacto.Nombre;
                    }
                    else
                    {
                        emailEnviar = email;
                        nombreContacto = "";
                    }

                    var fromAddress = new MailAddress(correo.Username, "Gemma");
                    var toAddress = new MailAddress(emailEnviar, nombreContacto);
                    //const string fromPassword = "Jn3gr32024/*";
                    string subject = "Pdf " + analisis.Nombre;
                    string body = texto;

                    using (var smtp = new SmtpClient
                    {
                        Host = "smtp.serviciodecorreo.es",
                        Port = 587,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential(fromAddress.Address, correo.Password),
                        EnableSsl = true
                    })
                    using (var emailEnvio = new MailMessage(fromAddress, toAddress)
                    {
                        Subject = subject,
                        Body = body == "null" ? "" : body,
                        IsBodyHtml = true
                    })
                    {
                        using (var attachmentStream = new MemoryStream(pdfBytes))
                        using (var attachment = new Attachment(attachmentStream, fileName, contentType))
                        {
                            emailEnvio.Attachments.Add(attachment);
                            await smtp.SendMailAsync(emailEnvio);
                        }
                    }

                    _unidadDeTrabajo.HistorialCorreosContactosRepository.InsertarHistorialCorreo(new HistorialCorreosEnviados
                    {
                        CodigoCliente = codigoCliente,
                        Email = emailEnviar,
                        NombreContacto = nombreContacto,
                        Fecha = DateTime.Now,
                        IdElemento = idElemento
                    });

                    await Task.Delay(250);
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private void GuardarRegistroCorreosEnviados()
        {

        }

        public async Task<Files> Download(int id)
        {
            return await _unidadDeTrabajo.FilesRepository.Download(id);
        }

        public async Task<string> DownloadFolderSchema(string clientName, string clientCode, string clientOffer, string accionType)
        {
            try
            {
                string respuesta = await _unidadDeTrabajo.FilesRepository.DownloadFolderSchema(clientName, clientCode, clientOffer, accionType);
                return respuesta;
            }
            catch (Exception e)
            {
                return "";
            }
        }

        public async Task<bool> ChangeFolderName(string path, string oldName, string newName)
        {
            try
            {
                bool respuesta = await _unidadDeTrabajo.FilesRepository.ChangeFolderName(path, oldName, newName);
                return respuesta;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<bool> CreateNewFolder(string path, string folderName)
        {
            try
            {
                bool respuesta = await _unidadDeTrabajo.FilesRepository.CreateNewFolder(path, folderName);
                return respuesta;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteFolder(string path)
        {
            try
            {
                bool respuesta = await _unidadDeTrabajo.FilesRepository.DeleteFolder(path);
                return respuesta;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteFile(string path, string fileName)
        {
            try
            {
                bool respuesta = await _unidadDeTrabajo.FilesRepository.DeleteFile(path, fileName);
                return respuesta;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<bool> UploadFileByPath(string path, string fileName, IFormFile file)
        {
            try
            {
                bool respuesta = await _unidadDeTrabajo.FilesRepository.UploadFileByPath(path, fileName, file);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
