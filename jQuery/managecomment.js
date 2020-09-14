$(document).ready(function(){

	ComboSelectLoadPosts();

	$("#create_comment_post").change(function(){
        split=$("#create_comment_post").val().split("--");
        //alert(split[0]);
        PostBodyForComment();
    });

    $("#create_comment_button").click(function(){
        split=$("#create_comment_post").val().split("--");
        CreateComment();
    });

	$("#load_comment_button").click(function(){
		loadComments();
	});

	

	$("#comment_list").change(function(){
        split=$("#comment_list").val().split("--");
		//alert(split);
		//GetPostBody();
		loadComments();
    });

    $("#comment_list_single").change(function(){
        split1=$("#comment_list_single").val().split("--");
		//alert(split);
		//GetPostBody();
		loadComments_dropdown();
    });

    $("#comment_list_single_post").change(function(){
        //commentid=$("#comment_list_single_post").val();
        split2=$("#comment_list_single_post").val().split("--");
		//alert(split2);
		//GetPostBody();
		//loadComments_dropdown();
		loadSingleComment();
		
    });

    $("#delete_comment_dropdown").change(function(){
        split=$("#delete_comment_dropdown").val().split("--");
		//alert(split);
		//GetPostBody();
		deleteComments_dropdown();
    });

    $("#delete_comment_button").click(function(){
    	
		deleteComment();
	});

    $("#updatecomment_post_dropdown").change(function(){
        split=$("#updatecomment_post_dropdown").val().split("--");
		//alert(split);
		populateupdatecomment();
		//GetPostBody();
		//loadComments();
    });

  	$("#updatecomment_comment_dropdown").change(function(){
        //commentid=$("#comment_list_single_post").val();
        split=$("#updatecomment_comment_dropdown").val().split("--");
		//alert(split);
		$("#update_comment_body").val(split[0]);
		//GetPostBody();
		//loadComments_dropdown();
		//loadSingleComment();
		//loadcommentbodyforupdate();
		
    });

    $("#update_button").click(function(){
    	
		editComment();
	});



	function ComboSelectLoadPosts()
	{
    $.ajax({
            url:"https://localhost:44347/api/posts",
            method:"get",
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    var data=xmlHttp.responseJSON;
                    var str='';
                    for (var i = 0; i < data.length; i++) {
                        str+="<option>"+data[i].PostId+"--"+data[i].Posttitle+"</option>";
                        $("#create_comment_post").html(str);
                        $("#comment_list").html(str);
                        $("#comment_list_single").html(str);
                        $("#delete_comment_dropdown").html(str);
                        $("#updatecomment_post_dropdown").html(str);
                        
                    };
                    
                }
                else
                {
                    console.log(xmlHttp.status+":"+xmlHttp.statusText);
                }
            }    
        });
	}

	

	function loadComments()
	{
	$.ajax({
			url:"https://localhost:44347/api/posts/"+split[0]+"/comments",
			method:"get",
			headers:{
				contentType:"application/json"
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					
					str+="<tr><td>Comment Body</td><td>Post ID</td></tr>";
					for (var i = 0; i < data.length; i++) {
						str+="<tr><td>"+data[i].CommentBody+"</a></td><td>"+data[i].PostId+"</td></tr>";
						$("#commentlisttable").html(str);
					};
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
	}

	function loadComments_dropdown()
	{
	$.ajax({
			url:"https://localhost:44347/api/posts/"+split1[0]+"/comments",
			method:"get",
			headers:{
				contentType:"application/json"
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					
					//str+="<tr><td>Comment Body</td><td>Post ID</td></tr>";
					for (var i = 0; i < data.length; i++) {
						str+="<option>"+data[i].CommentBody+"--"+data[i].CommentId+"</option>";
                        $("#comment_list_single_post").html(str);
                        //$("#comment_list").html(str);
                       //$("#delete_commentlist_load").html(str);
					};
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
	}

	

	function loadSingleComment()
	{
		//alert(split2[0]);
		
		var str="";			
		 str+="<tr><td>Comment Body</td></tr>";
					
		//alert(data[i]);
		str+="<tr><td>"+split2[0]+"</td></tr>";
		//alert(str);
		$("#singlepostcomment").html(str);
	}

	function deleteComments_dropdown()
	{
		//alert(split);
	$.ajax({
			url:"https://localhost:44347/api/posts/"+split[0]+"/comments",
			method:"get",
			headers:{
				contentType:"application/json"
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					
					//str+="<tr><td>Comment Body</td><td>Post ID</td></tr>";
					for (var i = 0; i < data.length; i++) {
						str+="<option value="+data[i].CommentId+">"+data[i].CommentBody+"</option>";
                        $("#delete_commentlist_load").html(str);
                        //$("#comment_list").html(str);
                       //$("#delete_commentlist_load").html(str);
					};
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
	}

	function deleteComment()
	{
		
		var commentid=$("#delete_commentlist_load").val();
		//alert(commentid);
		$.ajax({
				url:"https://localhost:44347/api/posts/"+split[0]+"/comments/"+commentid,
				method:"delete",
				headers:{
					contentType:"application/json"
				},
				complete:function(xmlHttp,status){
					if(xmlHttp.status==204)
					{
						$("#deletecommentmessage").html("Post deleted");
						
						//loadPosts();
						//ComboSelectLoadPosts();
						ComboSelectLoadPosts();
						$("#delete_commentlist_load").html("")
	
					}
					else
					{
						$("#deletecommentmessage").html("Error");
						console.log(xmlHttp.status+":"+xmlHttp.statusText);
					}
				}
			});
	}

	function populateupdatecomment()
	{
		//alert(split);
		$.ajax({
			url:"https://localhost:44347/api/posts/"+split[0]+"/comments",
			method:"get",
			headers:{
				contentType:"application/json"
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					
					//str+="<tr><td>Comment Body</td><td>Post ID</td></tr>";
					for (var i = 0; i < data.length; i++) {
						str+="<option>"+data[i].CommentBody+"--"+data[i].CommentId+"</option>";
                        $("#updatecomment_comment_dropdown").html(str);
                        //$("#comment_list").html(str);
                       //$("#delete_commentlist_load").html(str);
					};
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
	}

	function editComment()
	{
		//alert(split);
		var postid=$("#updatecomment_post_dropdown").val().split("--");
		//alert(postid[0]);

		$.ajax({
            url:"https://localhost:44347/api/posts/"+postid[0]+"/comments/"+split[1],
            method:"put",
            headers:{
                contentType:"application/json"
            },
            data:{
                CommentBody:$("#update_comment_body").val(),
				PostId:postid[0]
				
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    $("#updatecommentmessage").html("Post edited!");
                    $("#update_comment_body").val("");
					$("#updatecomment_comment_dropdown").val("");
                    //loadPosts();
					ComboSelectLoadPosts();
                }
                else
                {
                    $("#updatecommentmessage").html("Error");
                    console.log(xmlHttp.status+":"+xmlHttp.statusText);
                }
            }
        });
	}

	function PostBodyForComment()
    {
        $.ajax({
            url:"https://localhost:44347/api/posts/"+split[0],
            method:"get",
            complete:function(xmlHttp,status){
            if(xmlHttp.status==200)
            {
                var data=xmlHttp.responseJSON;
                var str='';
 
                $("#post_body").html(data.PostBody);
 
            }
            else
            {
                console.log(xmlHttp.status+":"+xmlHttp.statusText);
            }
            }
        });
    }


    

	function CreateComment()
    {
//alert(split[0]+" :123");
//alert(split[1]+" :123");
        $.ajax({
			url:"https://localhost:44347/api/posts/"+split[0]+"/comments",
			method:"post",
			headers:{
					contentType:"application/json"
       			 	},
			data:{	
				CommentBody:$("#create_comment_body").val(),
				PostId: split[0]
        		},
			complete:function(xmlHttp,status){
			if(xmlHttp.status==201)
            	{
 
				$("#createcommentmessage").html("Post created!");
				$("#create_comment_body").val("");
//$("#createpostbody").val("");
//loadPosts();
				ComboSelectLoadPosts();            
            }
else
            {
$("#createcommentmessage").html("Error");
                console.log(xmlHttp.status+":"+xmlHttp.statusText);
            }
        }
        });
    }



});