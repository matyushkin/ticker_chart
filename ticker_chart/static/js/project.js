/* Project specific Javascript goes here. */
let url = `ws://${window.location.host}/ws/socket-server/`;
let socket = new WebSocket(url) 

socket.addEventListener('message', (event) => {
    console.log('Message from server', event.data);
});