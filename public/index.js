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


function makeMessage(message, isUser){
  var li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    if (isUser){
      li.style.color = "red"
      li.className = 'user'
    }
    else{
      li.style.color = "blue"
      li.className = 'not-user'
    }
    text.val('');

    list.appendChild(li);

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
