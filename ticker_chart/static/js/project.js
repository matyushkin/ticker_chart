/* Project specific Javascript goes here. */
let url = `ws://${window.location.host}/ws/socket-server/`;

const chatSocket = new WebSocket(url);

chatSocket.onmessage = function (e) {
  let data = JSON.parse(e.data);
  console.log("Data:", data);
};
