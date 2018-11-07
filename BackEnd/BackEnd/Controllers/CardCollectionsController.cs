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
            return _context.CardCollection;
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

            _context.Entry(cardCollection).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CardCollectionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
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