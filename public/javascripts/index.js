let socket = io();
let form = document.getElementById('form')
let input = document.getElementById('input')
let loading = document.getElementById("loader")
let lock = true;
form.addEventListener('submit', (e) => {
e.preventDefault()
if (input.value) {
    socket.emit('send-message', input.value)
    input.value = ''
}
})

socket.on('send-message', (msg) => {
let item = document.createElement('li');
if(lock){
    input.disabled = true;
    loading.innerHTML = loader();
    lock = false;
}else{
    input.disabled = false;
    loading.innerHTML = "";
    lock = true;
}
// console.log(msg);
msg = formatText(msg);

item.innerHTML = msg;
messages.appendChild(item);
window.scrollTo(0, document.body.scrollHeight);
});



function loader (){
    return `<div class="spinner-border m-5" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`
}

function formatText (msg){
    msg = msg.replaceAll ('\n','<br/>')
    return msg;
}