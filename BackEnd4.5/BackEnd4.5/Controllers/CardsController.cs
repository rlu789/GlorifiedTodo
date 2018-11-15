using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using BackEnd4._5.Context;
using BackEnd4._5.Models;
using System.Threading.Tasks;
using System.Web.Http.Cors;

namespace BackEnd4._5.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CardsController : ApiController
    {
        private ChelloContext _context = new ChelloContext();

        // POST api/values
        public async Task<Card> PostCard([FromBody] Card card)
        {
            _context.Card.Add(card);
            await _context.SaveChangesAsync();

            return card;
        }


        // DELETE api/values/5
        public void Delete(int id)
        {

            var card = _context.Card.Find(id);

            _context.Card.Remove(card);
            _context.SaveChanges();
        }
    }
}