document.addEventListener('DOMContentLoaded', function () {
    var i = document.querySelector('button');
    if (i){
        i.addEventListener("click", onclick, false)
    }

    function onclick () {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, 'hi', setChecked)
            }    
        )
        // var bgp = chrome.extension.getBackgroundPage()
        // var selected = document.getElementsByClassName("oZ-jc T-Jo J-J5-Ji T-Jo-Jp");
        
        }
    function setChecked (res) {
        const div = document.createElement('div')
        console.log('here')
        // div.textContent = res['count']
        // document.body.appendChild(div)
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/test',
            data: res,
            encoding: 'UTF-8',
            success: function (resp){
                div.textContent = resp
                document.body.appendChild(div)
            },
            error: function(er,a,b){
                console.log("error has occurred");
            }
        });
        return true;
    }
},false);
            
