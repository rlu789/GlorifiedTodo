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
        public IHttpActionResult PostCardCollection([FromBody] CardCollection cardCollection)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CardCollections.Add(cardCollection);
            _context.SaveChanges();

            return Ok(cardCollection);
        }


        // DELETE api/values/5
        public void Delete(int id)
        {

            var cardCollection = _context.CardCollections.FirstOrDefault(i => i.Id == id);

            _context.CardCollections.Remove(cardCollection);
            _context.SaveChanges();
        }
    }
}