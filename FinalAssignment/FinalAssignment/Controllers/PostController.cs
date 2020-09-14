using AssignemntFinal.Models;
using AssignemntFinal.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalAssignment.Controllers
{
    [RoutePrefix("api/posts")]
    public class PostController : ApiController
    {
        PostRepository postrepo = new PostRepository();

        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(postrepo.GetAll());
        }

        [Route("{id}", Name = "GetPostById")]
        public IHttpActionResult Get(int id)
        {
            Post p = postrepo.GetByID(id);
            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(p);
        }


        [Route("")]
        public IHttpActionResult Post(Post p)
        {
            postrepo.Insert(p);
            string url = Url.Link("GetPostById", new { id = p.PostId });
            return Created(url, p);
        }

        [Route("{id}")]
        public IHttpActionResult Put([FromBody] Post p, [FromUri] int id)
        {
            p.PostId = id;
            postrepo.Edit(p);
            return Ok(p);
        }

        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            postrepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
