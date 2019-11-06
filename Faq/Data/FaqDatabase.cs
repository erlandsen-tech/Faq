using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Faq.Data
{
    public class FaqDatabase : DbContext
    {
        public FaqDatabase (DbContextOptions<FaqDatabase> options)
            : base(options)
        {
        }

        public DbSet<dbQuestion> Question { get; set; }
    }
    public class dbQuestion
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public int Points { get; set; }
    }
}
