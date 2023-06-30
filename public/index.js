let url = new URL(document.location.href)
console.log(url)
let wsProtocol
if (url.protocol == "http:"){
    wsProtocol = 'ws://'
}
else{
    wsProtocol = 'wss://'
}
let wsUrl = wsProtocol + url.host
console.log(wsUrl)
client = new WebSocket(wsUrl);

let list = document.getElementById('testList')

let text = $('#textBox')


// if (localStorage.nums == null){
//     localStorage.nums = [];
// }


function makeMessage(message, isUser){
    var div = document.createElement("div");
    div.className = 'msg-container'
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    if (isUser){
        // li.style.color = "red"
        li.className = 'user'
    }
    else{
        // li.style.color = "blue"
        li.className = 'not-user'
    }
    text.val('');
    div.appendChild(li);
    list.appendChild(div);

    div.scrollIntoView({behavior: "smooth"});

}

text.keydown(function(event) {
    if (event.key === "Enter"){
        client.send(text.val());
        makeMessage(text.val(), true);
    }
});


client.onmessage = (event) => {
    makeMessage(event.data, false)
};


$.get(url + "\messages", function(data, status){
    console.log(data, status)
    for (msg of data){
        makeMessage(msg, false)
    }
})

// console.log(client)