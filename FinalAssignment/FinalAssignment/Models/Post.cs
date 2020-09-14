using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AssignemntFinal.Models
{
    public class Post
    {
        [Key]
        public int PostId { get; set; }

        [Column(TypeName="varchar"),StringLength(30),Display(Name= "Post Title" )]
        [Required(ErrorMessage ="Post title can not be empty")]
        public string Posttitle { get; set; }

        [Column(TypeName = "varchar"), StringLength(30), Display(Name = "Post Status")]
        [Required(ErrorMessage = "Status can not be empty")]
        public string PostBody { get; set; }

        public IEnumerable<Comment> Comments { get; set; }
    }
}