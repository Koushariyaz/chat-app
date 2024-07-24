const socket = io()

const msgInput = document.querySelector('input')
const activityState = document.querySelector('.activity')
const welcome = document.querySelector('.welcome')

function sendMessage(e) {
    e.preventDefault()
    console.log(msgInput.value)
    if (msgInput.value) {
        socket.emit('message',JSON.stringify({
            username:socket.id.substring(0,5),
            message:msgInput.value
        }))
        msgInput.value = ""
    }
    msgInput.focus()
}

document.querySelector('form')
    .addEventListener('submit', sendMessage)

// Listen for messages 
socket.on("chat message", ( data ) => {
    activityState.textContent=''
    const parseData = JSON.parse(data)
    const li = document.createElement('li')

    const user = document.createElement('span')
    user.classList.add('user')
    user.innerText = parseData.username + ' : '

    const message = document.createElement('span')
    message.classList.add('message')
    message.innerText = parseData.message

    li.appendChild(user)
    li.appendChild(message)
    document.querySelector('ul').appendChild(li)
    window.scrollTo(0, document.body.scrollHeight);
})

msgInput.addEventListener('keypress',()=>{
    socket.emit('activity',socket.id.substring(0,5))
})

socket.on('activity',(name)=>{
    activityState.textContent = `${name} is typing.....`
    setTimeout(()=>{
        activityState.textContent = ''
    },3000)
})

socket.on('message',(data)=>{
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})

socket.on('disconnect',(data)=>{
    console.log('ddd')
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})