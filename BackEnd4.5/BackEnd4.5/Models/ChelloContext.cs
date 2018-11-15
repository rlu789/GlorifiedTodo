using BackEnd4._5.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace BackEnd4._5.Context
{
    public class ChelloContext : DbContext
    {
        public DbSet<Board> Board { get; set; }
        public DbSet<CardCollection> CardCollection { get; set; }
        public DbSet<Card> Card { get; set; }
        //public DbSet<Department> Departments { get; set; }
        //public DbSet<Enrollment> Enrollments { get; set; }
        //public DbSet<Instructor> Instructors { get; set; }
        //public DbSet<Student> Students { get; set; }
        //public DbSet<OfficeAssignment> OfficeAssignments { get; set; }
        //public DbSet<Person> People { get; set; }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    //modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

        //    modelBuilder.Entity<Board>()
        //        .HasMany(c => c.CardCollections);

        //    modelBuilder.Entity<CardCollection>()
        //        .HasMany(c => c.Cards);

        //    //modelBuilder.Entity<Department>().MapToStoredProcedures();
        //}
    }
}