using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Linq.Mapping;
using System.Linq;
using System.Web;

namespace BackEnd4._5.Models
{
    [Table(Name = "CardCollections")]
    public class CardCollection
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public List<Card> Card { get; set; }

        [Required]
        public int BoardId { get; set; }

        public string Color { get; set; }
    }
}