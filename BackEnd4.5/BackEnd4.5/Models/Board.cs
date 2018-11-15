using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd4._5.Models
{
    public class Board
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public List<CardCollection> CardCollections { get; set; }
    }
}