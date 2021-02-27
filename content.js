console.log("Hello World");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var selected = document.getElementsByClassName("oZ-jc T-Jo J-J5-Ji T-Jo-Jp");
    sendResponse({count: selected.length})
})

var data = [];
setTimeout(() => {
    var person = document.getElementsByTagName('tr');
    finalDict = {}
    console.log(person.length);
    for (let i = 4; i < person.length; i++){
        var item = person.item(i);
        // highlight(item);
        var div = item.getElementsByClassName('yX xY ');
        for (let j = 0; j < div.length; j++){
            // console.log(div.item(j).getElementsByClassName('afn').item(0).textContent);
            var email = div.item(j).getElementsByClassName('afn').item(0).getElementsByTagName('span')

            var emailID = email.item(0).innerHTML.split(' ')[2]
            
            var finalEmail = emailID.substring(7, emailID.length-1);
            finalDict[finalEmail] = item;
            var dataItem = {};
            var temp = "";
            if (div.item(j).getElementsByClassName('afn').item(0).textContent.split(',')[0] == div.item(j).getElementsByClassName('afn').item(0).getElementsByTagName('span').item(1).textContent){
                temp = "read"
            }
            else{
                temp = div.item(j).getElementsByClassName('afn').item(0).textContent.split(',')[0];
            }
            
            if (email.length == 5){
                dataItem = {
                    "sender" : div.item(j).getElementsByClassName('afn').item(0).getElementsByTagName('span').item(1).textContent,
                    "subject" : div.item(j).getElementsByClassName('afn').item(0).getElementsByTagName('span').item(3).textContent,
                    "status" : temp,
                    "reply" : true,
                    "email" : finalEmail
                }
                data.push(dataItem);
            }
            else if (email.length == 7){
                dataItem = {
                    "sender" : div.item(j).getElementsByClassName('afn').item(0).getElementsByTagName('span').item(1).textContent,
                    "subject" : div.item(j).getElementsByClassName('afn').item(0).getElementsByTagName('span').item(5).textContent,
                    "status" : temp,
                    "reply" : true,
                    "email" : finalEmail
                }
                data.push(dataItem);
            }
            else{
                dataItem = {
                    "sender" : div.item(j).getElementsByClassName('afn').item(0).getElementsByTagName('span').item(1).textContent,
                    "subject" : div.item(j).getElementsByClassName('afn').item(0).getElementsByTagName('span').item(2).textContent,
                    "status" : temp,
                    "reply" : false,
                    "email" : finalEmail
                }
                data.push(dataItem);
            }
            
        }
    }
    console.log(data)
    chrome.runtime.sendMessage(JSON.stringify(data), function(response) {
        console.log(response)
        var cleanData = []
        var flagged = response.substring(1, response.length-1).split(',');
        for(let i = 0; i < flagged.length; i++){
            if (flagged[i].length > 5){
                if(i == 0)
                    cleanData.push(flagged[i].trim().substring(1, flagged[i].length-1))
                else
                    cleanData.push(flagged[i].trim().substring(1, flagged[i].length-2))
            }
        }
        for(let i = 0; i < cleanData.length; i++){
            console.log(cleanData[i])
            if(cleanData[i] in finalDict){
                highlight(finalDict[cleanData[i]]);
                highlight(finalDict['security@mail.gitguardian.com'])
            }
        }
        
    });
    

}, 7000);

// setTimeout(() => {
    
//     var selected = document.getElementsByClassName("oZ-jc T-Jo J-J5-Ji T-Jo-Jp");
//     console.log(selected);
// }, 20000);



function highlight(tag){
    if(tag){
        console.log(tag)
        var html = tag.outerHTML;
        //adds high span tag to the innerHTML
        s2 = html.substring(0,4) + 'style="background-color: aqua;" ' + html.substring(4);
        s = '<span style="background-color: aqua;">' + html + '</span>'
        // sets the innerHTML to the new high tag html
        // tag.outerHTML = s2;
        try{
            tag.style.backgroundColor = "aqua";
            // tag.outerHTML = ""
        }
        catch(err){
            console.log(err)
        }
        
        // tag.style.backgroundColor = "black";
    }

};