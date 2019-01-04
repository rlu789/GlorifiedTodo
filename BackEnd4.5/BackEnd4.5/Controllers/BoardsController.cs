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
        public IHttpActionResult GetBoard()
        {
            var boards = _context.Boards;
            foreach (Board b in boards)
            {
                b.PasswordConvert();
            }
            return Ok(boards);
        }

        // GET: api/Boards/5
        public IHttpActionResult GetSingleBoard(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var board = _context.Boards.Include(i => i.CardCollection.Select(cardCollection => cardCollection.Card))
                .FirstOrDefault(i => i.Id == id);

            if (board == null)
            {
                return NotFound();
            }

            board.PasswordConvert();
            return Ok(board);
        }

        // POST api/values
        public IHttpActionResult PostBoard([FromBody] Board board)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Boards.Add(board);
            _context.SaveChanges();

            return Ok(board);
        }
        

        // DELETE api/values/5
        public IHttpActionResult Delete(int id)
        {
            var board = _context.Boards.Find(id);

            if (board.Password != null)
            {
                string password = Request.Headers.GetValues("Authorization").FirstOrDefault();
                if (password == board.Password) // success
                {
                    _context.Boards.Remove(board);
                    _context.SaveChanges();
                    return Ok();
                }
                else // fail
                {
                    return Unauthorized();
                }
            }
            else
            {
                _context.Boards.Remove(board);
                _context.SaveChanges();
                return Ok();
            }
        }
    }
}
