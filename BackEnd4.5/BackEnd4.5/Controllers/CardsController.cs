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

        // POST api/card
        public IHttpActionResult PostCard([FromBody] Card card)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Cards.Add(card);
            _context.SaveChanges();

            return Ok(card);
        }


        // DELETE api/card/5
        public void Delete(int id)
        {

            var card = _context.Cards.Find(id);

            _context.Cards.Remove(card);
            _context.SaveChanges();
        }


        // PUT api/values/5
        public IHttpActionResult Put(int id, [FromBody]Card card)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var c = _context.Cards.FirstOrDefault(i => i.Id == id);

            if (c == null)
            {
                return NotFound();
            }

            c.Title = card.Title;
            c.Description = card.Description;
            c.CardCollectionId = card.CardCollectionId;
            _context.SaveChanges();
            return Ok(card);
        }
    }
}