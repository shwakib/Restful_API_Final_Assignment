using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AssignemntFinal.Models
{
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }

        [Column(TypeName = "varchar"), StringLength(30), Display(Name = "Post Title")]
        [Required(ErrorMessage = "Post title can not be empty")]
        public string CommentBody { get; set; }

        public int PostId { get; set; }

        public Post Post { get; set; }
    }
}