using System;
using System.Collections.Generic;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Correos : BaseEntity
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}