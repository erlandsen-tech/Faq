using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Faq.Models
{
    public class Question
    {
        public string title { get; set; }
        public string body { get; set; }
        public string category { get; set; }
        public string name { get; set; }
        public string email { get; set; }
    }
}
