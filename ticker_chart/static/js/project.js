/* Project specific Javascript goes here. */
let url = `ws://${window.location.host}/ws/socket-server/`;
let socket = new WebSocket(url) 
let json

socket.addEventListener('message', (event) => {
    json = event.data.toString()
    json = JSON.parse(json)
    console.log(json);
});