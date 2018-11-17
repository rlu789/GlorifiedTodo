using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Linq.Mapping;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd4._5.Models
{
    [Table(Name = "Cards")]
    public class Card
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int CardCollectionId { get; set; }

        //public CardCollection CardCollection { get; set; }
    }
}