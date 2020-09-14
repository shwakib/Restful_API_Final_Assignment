using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AssignemntFinal.Models
{
    public class BlogDataContext:DbContext
    {

        public BlogDataContext()
        {
            //Database.SetInitializer<BlogDataContext>(new DropCreateDatabaseIfModelChanges<BlogDataContext>());
        }

        virtual public DbSet<Post> Posts { get; set; }
        virtual public DbSet<Comment> Comments { get; set; }

        
    }
}