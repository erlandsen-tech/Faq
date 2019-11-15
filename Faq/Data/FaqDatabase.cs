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
        public virtual DbSet<dbQuestion> Questions { get; set; }
        public FaqDatabase()
        {
            Database.EnsureCreated();
        }
        public FaqDatabase(DbContextOptions<FaqDatabase> options)
    : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                @"Server=(localdb)\mssqllocaldb;Database=FaqDatabase;Integrated Security=True");
        }
    }
    public class dbQuestion
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public int Points { get; set; }
        public string Answer { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Category { get; set; }
    }
}
