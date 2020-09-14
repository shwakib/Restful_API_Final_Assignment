$(document).ready(function(){

	ComboSelectLoadPosts();

	$("#LoadPosts").click(function(){
		loadPosts();
	});
	
	$("#update_post_button").click(function(){
		editPost();
	});

	$("#create_post_button").click(function(){
		CreatePost();
	});
	
	$("#delete_post_button").click(function(){
		split=$("#deleteposttitle").val().split("--");
		deletePost();
	});

	$("#updateposttitle").change(function(){
        split=$("#updateposttitle").val().split("--");
		$("#update_posttitle").val(split[1]);
		GetPostBody();
    });


function loadPosts()
{
	$.ajax({
			url:"https://localhost:44347/api/posts",
			method:"get",
			headers:{
				contentType:"application/json"
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					
					str+="<tr><th>Post Title</th><th>Post Body</th></tr>";
					for (var i = 0; i < data.length; i++) {
						str+="<tr><td><a href=postdetails.html?id="+data[i].PostId+">"+data[i].Posttitle+"</a></td><td>"+data[i].PostBody+"</td></tr>";
						$("#postlisttable").html(str);
					};
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
}

function CreatePost()
{
	$.ajax({
		url:"https://localhost:44347/api/posts",
		method:"post",
		headers:{
			contentType:"application/json"
		},
		data:{
			Posttitle:$("#createposttitle").val(),
			PostBody:$("#createpostbody").val(),
			Comments: null
		},
		complete:function(xmlHttp,status){
			if(xmlHttp.status==201)
			{
				$("#createpostmessage").html("Post created!");
				$("#createposttitle").val("");
				$("#createpostbody").val("");
				loadPosts();
				ComboSelectLoadPosts();			
			}
			else
			{
				$("#createpostmessage").html("Error");
				console.log(xmlHttp.status+":"+xmlHttp.statusText);
			}
		}
	});
}

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
                        $("#updateposttitle").html(str);
                        $("#deleteposttitle").html(str);
                    };
                    
                }
                else
                {
                    console.log(xmlHttp.status+":"+xmlHttp.statusText);
                }
            }    
        });
}


function editPost()
{
    $.ajax({
            url:"https://localhost:44347/api/posts/"+split[0],
            method:"put",
            headers:{
                contentType:"application/json"
            },
            data:{
                Posttitle:$("#update_posttitle").val(),
				PostBody:$("#updatepostbody").val(),
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    $("#updatepostmessage").html("Post edited!");
                    $("#update_posttitle").val("");
					$("#updatepostbody").val("");
                    loadPosts();
					ComboSelectLoadPosts();
                }
                else
                {
                    $("#updatepostmessage").html("Error");
                    console.log(xmlHttp.status+":"+xmlHttp.statusText);
                }
            }
        });
}

function GetPostBody()
    {
	$.ajax({
			url:"https://localhost:44347/api/posts/"+split[0],
			method:"get",
			headers:{
				contentType:"application/json"
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';

					str+=data.PostBody;
                    $("#updatepostbody").val(str);
					
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
	}
	
	function deletePost()
	{
		$.ajax({
				url:"https://localhost:44347/api/posts/"+split[0],
				method:"delete",
				headers:{
					contentType:"application/json"
				},
				complete:function(xmlHttp,status){
					if(xmlHttp.status==204)
					{
						$("#deletepostmessage").html("Post deleted");
						
						loadPosts();
						ComboSelectLoadPosts();
	
					}
					else
					{
						$("#deletepostmessage").html("Error");
						console.log(xmlHttp.status+":"+xmlHttp.statusText);
					}
				}
			});
	}


});