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
            // https://www.codeproject.com/Articles/1158937/SQLite-with-Csharp-Net-and-Entity-Framework
            SQLiteConnection sqlite_conn;          // Database Connection Object
            SQLiteCommand sqlite_cmd;             // Database Command Object
            SQLiteDataReader sqlite_datareader;  // Data Reader Object
            string text = "";

            sqlite_conn = new SQLiteConnection("Data Source=" + AppDomain.CurrentDomain.BaseDirectory + "MyDatabase.sqlite;Version=3;");

            sqlite_conn.Open();

            sqlite_cmd = sqlite_conn.CreateCommand();

            //sqlite_cmd.CommandText = @"SELECT * FROM Boards AS a 
            //  INNER JOIN CardCollections AS b
            //  ON a.Id = b.BoardId";
            sqlite_cmd.CommandText = @"SELECT * FROM Boards";

            sqlite_datareader = sqlite_cmd.ExecuteReader();
            List<Board> boards = new List<Board>();
            while (sqlite_datareader.Read()) // Read() returns true if there is still a result line to read
            {

                object idReader = sqlite_datareader.GetValue(0);
                string textReader = sqlite_datareader.GetString(1);

                text += idReader + " '" + textReader + "' " + "\n";
            }

            return _context.Board;
        }

        // GET: api/Boards/5
        public async Task<Board> GetSingleBoard(int id)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            var board = await _context.Board.Include(i => i.CardCollections.Select(cardCollection => cardCollection.Cards))
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

            _context.Board.Add(board);
            await _context.SaveChangesAsync();

            return board;
        }
        

        // DELETE api/values/5
        public void Delete(int id)
        {

            var board = _context.Board.Find(id);

            _context.Board.Remove(board);
            _context.SaveChanges();
        }
    }
}
