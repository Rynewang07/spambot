console.log("script.js")

$.ajax({
    url: "http://127.0.0.1:5000/data",
    type: "POST",
    success: function(resp){
        console.log(resp);
        console.log(data);
        
    },
    error: function(e,a,b){
        console.log("an error occured");
    }
});