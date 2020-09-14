using AssignemntFinal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AssignemntFinal.Repository
{
   interface ICommentRepository
    {
        List<Comment> GetCommentsWithPost(int id);

        Comment GetCommentWithPost(int id, int id2);
    }
}