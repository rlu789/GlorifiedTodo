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
using BackEnd4._5.Handlers;

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

            if (board.Password != null) board.Password.Trim();
            _context.Boards.Add(board);
            _context.SaveChanges();

            return Ok(board);
        }


        // PUT api/values/5
        public IHttpActionResult Put(int id, [FromBody]Board board)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var b = _context.Boards.FirstOrDefault(i => i.Id == id);

            if (b == null)
            {
                return NotFound();
            }
            
            if (!AuthorizationHandler.PasswordMatched(b.Password, Request)) return Unauthorized();

            b.Title = board.Title;
            if (board.Password != null && board.Password.Trim().Length > 0) b.Password = board.Password.Trim();
            _context.SaveChanges();
            b.PasswordConvert();
            return Ok(b);
        }


        // DELETE api/values/5
        public IHttpActionResult Delete(int id)
        {
            var board = _context.Boards.Find(id);

            if (board.Password != null)
            {
                IEnumerable<string> password;
                Request.Headers.TryGetValues("Authorization", out password);
                if (password != null && password.FirstOrDefault() == board.Password) // success
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

        [System.Web.Mvc.Route("boards/{id}/authorize")]
        public IHttpActionResult Authorize(int id)
        {
            var board = _context.Boards.Find(id);

            if (board == null)
            {
                return NotFound();
            }
            
            IEnumerable<string> password;
            Request.Headers.TryGetValues("Authorization", out password);
            if (password != null && password.FirstOrDefault() == board.Password)
            {
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }

        [System.Web.Mvc.Route("boards/{id}/removeAuthorize")]
        public IHttpActionResult RemoveAuthorize(int id)
        {
            var board = _context.Boards.Find(id);

            if (board == null)
            {
                return NotFound();
            }
            
            if (!AuthorizationHandler.PasswordMatched(board.Password, Request)) return Unauthorized();
            board.Password = null;
            _context.SaveChanges();
            return Ok();
        }
    }
}
