console.log("hey its the bg page");

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log("Entered");
//         chrome.tabs.executeScript(null, {file: "script.js"});   
        
//     }
// );

chrome.runtime.onMessage.addListener(
    function(request, sender, response) {
        console.log(request); 
        var emails = JSON.stringify({msg: request})

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/data',
            data: emails,
            encoding: 'UTF-8',
            success: function (resp){
                console.log(resp);
                response(resp)
            },
            error: function(er,a,b){
                console.log("error has occurred");
            }
            });
            return true;
        
        
            // sendResponse({ message: "Background has received that message" });
        });