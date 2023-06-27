client = new WebSocket('ws://localhost:3000');

let list = document.getElementById('testList')

let text = $('#textBox')

// $(".textBox").on("keydown", ".search", function(event){
//   console.log('hi')
//   if (event.key === "Enter"){
//     var li = document.createElement("li");
//     li.appendChild(document.createTextNode(text.value));
//     list.appendChild(li);
  
//     client.send(text.value);
//   }
// })

text.keydown(function(event) {
  if (event.key === "Enter"){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(text.val()));
    li.style.color = "red"
    list.appendChild(li);
  
    client.send(text.val());
    text.val('');
  }
    
});



client.onmessage = (event) => {
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(event.data));
  li.style.color = "blue";
  list.appendChild(li);
};
