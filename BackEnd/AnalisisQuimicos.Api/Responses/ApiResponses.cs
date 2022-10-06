using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Api.Responses
{
    public class ApiResponses<T>
    {
        public ApiResponses(T data)
        {
            Data = data;
        }

        public T Data { get; set; }
    }
}
