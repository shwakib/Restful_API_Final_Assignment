using AssignemntFinal.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AssignemntFinal.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected BlogDataContext blog;

        public Repository()
        {
            this.blog = new BlogDataContext();
        }
        public void Delete(int id)
        {
            blog.Set<T>().Remove(GetByID(id));
            blog.SaveChanges();
        }

        public void Edit(T entity)
        {
            blog.Entry(entity).State = EntityState.Modified;
            blog.SaveChanges();
        }

        public List<T> GetAll()
        {
            return blog.Set<T>().ToList();
        }

        public T GetByID(int id)
        {
            return blog.Set<T>().Find(id);
        }

        public void Insert(T entity)
        {
            blog.Set<T>().Add(entity);
            blog.SaveChanges();
        }
    }
}