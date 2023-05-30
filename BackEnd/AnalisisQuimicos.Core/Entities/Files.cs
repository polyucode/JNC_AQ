using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class Files : BaseEntity
    {
        public string Name { get; set; }
        public string Format { get; set; }
        public string Path { get; set; }
    }
}
