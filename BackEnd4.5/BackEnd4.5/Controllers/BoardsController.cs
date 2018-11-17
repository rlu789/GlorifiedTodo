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
using System.Data.SQLite;

namespace BackEnd4._5.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BoardsController : ApiController
    {   
        private ChelloContext _context = new ChelloContext();

        // GET: Board
        public IEnumerable<Board> GetBoard()
        {
            return _context.Boards.ToList();
        }

        // GET: api/Boards/5
        public async Task<Board> GetSingleBoard(int id)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            var board = await _context.Boards.Include(i => i.CardCollection.Select(cardCollection => cardCollection.Card))
                .FirstOrDefaultAsync(i => i.Id == id);

            //if (board == null)
            //{
            //    return NotFound();
            //}

            return board;
        }

        // POST api/values
        public async Task<Board> PostBoard([FromBody] Board board)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            _context.Boards.Add(board);
            await _context.SaveChangesAsync();

            return board;
        }
        

        // DELETE api/values/5
        public void Delete(int id)
        {

            var board = _context.Boards.Find(id);

            _context.Boards.Remove(board);
            _context.SaveChanges();
        }
    }
}
