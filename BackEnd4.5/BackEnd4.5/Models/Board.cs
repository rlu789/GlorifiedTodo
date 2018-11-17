using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Linq.Mapping;
using System.Data.SQLite;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BackEnd4._5.SQLiteWithEF;

namespace BackEnd4._5.Models
{
    [Table(Name = "Board")]
    public class Board
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public List<CardCollection> CardCollection { get; set; }
    }
}