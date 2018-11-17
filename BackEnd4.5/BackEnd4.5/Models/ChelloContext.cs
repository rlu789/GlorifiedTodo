using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BackEnd4._5.Models;

namespace BackEnd4._5.Context
{
    public class ChelloContext : DbContext
    {
        public ChelloContext() :
            base(new SQLiteConnection()
            {
                ConnectionString = new SQLiteConnectionStringBuilder() { DataSource = AppDomain.CurrentDomain.BaseDirectory + "MyDatabase.sqlite", ForeignKeys = true }.ConnectionString
            }, true)
        {
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Board> Boards { get; set; }
        public DbSet<CardCollection> CardCollections { get; set; }
        public DbSet<Card> Cards { get; set; }
    }
}