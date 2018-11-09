using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd.Models;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardCollectionsController : ControllerBase
    {
        private readonly GlorifiedTodo _context;

        public CardCollectionsController(GlorifiedTodo context)
        {
            _context = context;
        }

        // GET: api/CardCollections
        [HttpGet]
        public IEnumerable<CardCollection> GetCardCollection()
        {
            var collections = _context.CardCollection
                .Include(cardCol => cardCol.Cards)
                .ToList();

            //foreach(CardCollection col in collections)
            //{
            //    foreach (Card c in col.Cards)
            //    {
            //        c.CardCollection = null;
            //    }
            //}

            return collections;
        }

        // GET: api/CardCollections/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCardCollection([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cardCollection = await _context.CardCollection.FindAsync(id);

            if (cardCollection == null)
            {
                return NotFound();
            }

            return Ok(cardCollection);
        }

        // PUT: api/CardCollections/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCardCollection([FromRoute] int id, [FromBody] CardCollection cardCollection)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cardCollection.Id)
            {
                return BadRequest();
            }

            CardCollection record = _context.CardCollection
                   .Single(b => b.Id == cardCollection.Id);
            if (record != null)
            {
                foreach(Card c in cardCollection.Cards)
                {
                    if (c.Id == 0)
                    {
                        _context.Card.Add(c);
                    }
                }
                _context.SaveChanges();
                // wow nice very good
                //record.Cards = cardCollection.Cards;
                //_context.SaveChanges();

            }

            return NoContent();
        }

        // POST: api/CardCollections
        [HttpPost]
        public async Task<IActionResult> PostCardCollection([FromBody] CardCollection cardCollection)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CardCollection.Add(cardCollection);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCardCollection", new { id = cardCollection.Id }, cardCollection);
        }

        // DELETE: api/CardCollections/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCardCollection([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cardCollection = await _context.CardCollection.FindAsync(id);
            if (cardCollection == null)
            {
                return NotFound();
            }

            _context.CardCollection.Remove(cardCollection);
            await _context.SaveChangesAsync();

            return Ok(cardCollection);
        }

        private bool CardCollectionExists(int id)
        {
            return _context.CardCollection.Any(e => e.Id == id);
        }
    }
}