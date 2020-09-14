$(document).ready(function(){
    
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    var param = $.urlParam('id');

    function loadPost()
    {
	$.ajax({
			url:"https://localhost:44347/api/posts/"+param,
			method:"get",
			headers:{
				contentType:"application/json"
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';

					str+="<tr><td colspan=2><div><label>Post Title: "+data.Posttitle+"</label></div></td></tr><tr><td colspan=2><div><label>Post Body: "+data.PostBody+"</label></div></td></tr>";
                    $("#post_table_details").html(str);
					
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
    }

    loadPost();

    function loadComments()
    {
	$.ajax({
			url:"https://localhost:44347/api/posts/"+param+"/comments",
			method:"get",
			headers:{
				contentType:"application/json"
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					
					for (var i = 0; i < data.length; i++) {
						str+="<tr><td><div><label>Comment: "+data[i].CommentBody+"</label></div></td></tr>";
						$("#comment_table_details").html(str);
					};
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
    }

    loadComments();
});