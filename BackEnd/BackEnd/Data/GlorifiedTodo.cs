using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BackEnd.Models;

    public class GlorifiedTodo : DbContext
    {
        public GlorifiedTodo (DbContextOptions<GlorifiedTodo> options)
            : base(options)
        {
        }

        public DbSet<CardCollection> CardCollection { get; set; }

        public DbSet<Card> Card { get; set; }
    }
