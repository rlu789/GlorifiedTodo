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
using BackEnd4._5.Handlers;

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
            
            var board = _context.Boards.Find(_context.CardCollections.Find(card.CardCollectionId).BoardId);
            if (board == null) return NotFound();
            if (!AuthorizationHandler.PasswordMatched(board.Password, Request)) return Unauthorized();

            _context.Cards.Add(card);
            _context.SaveChanges();

            return Ok(card);
        }


        // DELETE api/card/5
        public IHttpActionResult Delete(int id)
        {

            var card = _context.Cards.Find(id);

            var board = _context.Boards.Find(_context.CardCollections.Find(card.CardCollectionId).BoardId);
            if (board == null) return NotFound();
            if (!AuthorizationHandler.PasswordMatched(board.Password, Request)) return Unauthorized();

            _context.Cards.Remove(card);
            _context.SaveChanges();
            return Ok();
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

            var board = _context.Boards.Find(_context.CardCollections.Find(card.CardCollectionId).BoardId);
            if (board == null) return NotFound();
            if (!AuthorizationHandler.PasswordMatched(board.Password, Request)) return Unauthorized();

            c.Title = card.Title;
            c.ImgData = card.ImgData;
            c.Description = card.Description;
            c.CardCollectionId = card.CardCollectionId;

            _context.SaveChanges();
            return Ok(card);
        }
    }
}