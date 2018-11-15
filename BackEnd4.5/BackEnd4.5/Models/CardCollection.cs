using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BackEnd4._5.Models
{
    public class CardCollection
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public List<Card> Cards { get; set; }

        [Required]
        public int BoardId { get; set; }
    }
}