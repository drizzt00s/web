function submitMyPost(){
   var postTitle=$("#postTitle").val();
   var postContent=$("#postContents").val();
    $.ajax({
        url:"/WebstormProjects/web/views/posts.ejs",
        data:{"postTitle":postTitle,"postContent":postContent},
        type:"post",
        success:function(d){

         },
        error:function(xhr,textStatus,error){
           if(error){
               throw error;
           }
         }




    });




}