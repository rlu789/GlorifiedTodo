//using System;
//using System.Collections.Generic;
//using System.Data.Entity;
//using System.Linq;
//using System.Web;
//using System.Web.Http;
//using System.Web.Mvc;
//using BackEnd4._5.Context;
//using BackEnd4._5.Models;
//using System.Threading.Tasks;
//using System.Web.Http.Cors;
//using System.Data.SQLite;
//using BackEnd4._5.Handlers;

//namespace BackEnd4._5.Controllers
//{
//    [EnableCors(origins: "*", headers: "*", methods: "*")]
//    public class ImagesController : ApiController
//    {
//        private ChelloContext _context = new ChelloContext();

//        // GET: api/Image
//        public IHttpActionResult Get()
//        {
//            var images = _context.Images;
//            return Ok(images.FirstOrDefault());
//        }

//        // GET: api/Image/5
//        public string Get(int id)
//        {
//            return "value";
//        }

//        // POST: api/Image
//        public IHttpActionResult Post([FromBody] Image image)
//        {
//            if (!ModelState.IsValid)
//            {
//                return BadRequest(ModelState);
//            }
            
//            _context.Images.Add(image);
//            _context.SaveChanges();

//            return Ok(image);
//        }

//        // PUT: api/Image/5
//        public void Put(int id, [FromBody] Image image)
//        {
//        }

//        // DELETE: api/Image/5
//        public void Delete(int id)
//        {
//        }
//    }
//}
