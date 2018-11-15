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
    public class CardCollectionsController : ApiController
    {
        private ChelloContext _context = new ChelloContext();

        // POST api/values
        public async Task<CardCollection> PostCardCollection([FromBody] CardCollection cardCollection)
        {
            _context.CardCollection.Add(cardCollection);
            await _context.SaveChangesAsync();

            return cardCollection;
        }


        // DELETE api/values/5
        public void Delete(int id)
        {

            var cardCollection = _context.CardCollection.Find(id);

            _context.CardCollection.Remove(cardCollection);
            _context.SaveChanges();
        }
    }
}