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
    public class CommentController : ApiController
    {
        CommentRepository commentrepo = new CommentRepository();

        [Route("{id}/comments")]
        public IHttpActionResult Get([FromUri] int id)
        {
            List<Comment> c = commentrepo.GetCommentsWithPost(id);
            if (c == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(c);
        }

        [Route("{id}/comments/{id2}" , Name="GetCommentById")]
        public IHttpActionResult Get([FromUri] int id, [FromUri] int id2)
        {
            Comment c = commentrepo.GetCommentWithPost(id, id2);
            if (c == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(c);
        }


        [Route("{id}/comments")]
        public IHttpActionResult Post(Comment c, [FromUri] int id)
        {
            c.PostId = id;
            commentrepo.Insert(c);
            string url = Url.Link("GetCommentById", new { id = c.PostId , id2 = c.CommentId });
            return Created(url, c);
        }

        [Route("{id}/comments/{id2}")]
        public IHttpActionResult Put([FromBody] Comment c, [FromUri] int id, [FromUri] int id2)
        {
            c.PostId = id;
            c.CommentId = id2;
            commentrepo.Edit(c);
            return Ok(c);
        }

        [Route("{id}/comments/{id2}")]
        public IHttpActionResult Delete([FromUri] int id, [FromUri] int id2)
        {
            commentrepo.Delete(id2);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
