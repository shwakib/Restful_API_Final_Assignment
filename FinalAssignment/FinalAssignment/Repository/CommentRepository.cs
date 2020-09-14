using AssignemntFinal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AssignemntFinal.Repository
{
    public class CommentRepository: Repository<Comment>,ICommentRepository
    {
        public List<Comment> GetCommentsWithPost(int id)
        {
            return this.blog.Comments.Where(x => x.PostId == id).ToList();
        }

        public Comment GetCommentWithPost(int id, int id2)
        {
            return this.blog.Comments.Where(x => x.PostId == id && x.CommentId == id2).FirstOrDefault();
        }

        
    }
}