/* Project specific Javascript goes here. */
let url = `ws://${window.location.host}/ws/socket-server/`
let socket = new WebSocket(url) 
let json
let current_ticker = '00'
let ticker_data = []
let color = Chart.helpers.color
const numberOfTickers = 100
const select = document.getElementById("ticker-choose")
const red = color('rgb(255, 99, 132)')
let ctx = document.getElementById('myChart').getContext('2d');


// for trainling zeros
function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

// add ticker names to dropdown select
for (var i = 0; i < numberOfTickers; i++) {
	const option = document.createElement("option");
	option.value = pad(i, 2);
	option.innerText = "ticker_" + option.value;
	select.appendChild(option);
}

// config of chartjs
let config = {
	type: 'scatter',
	data: {
		datasets: [{
			label: current_ticker,
			backgroundColor: red.alpha(0.5).rgbString(),
			borderColor: red,
			fill: false,
			lineTension: 0,
			borderDash: [8, 4],
			data: ticker_data
		}]
	},
	options: {
		scales: {
			x: {
				type: 'time',
				display: true,
				title: {
					display: true,
					text: 'Time'
				},
				ticks: {
					major: {
					  enabled: true
					}
				}
			},
			y: {
				display: true,
				title: {
					display: true,
					text: 'Ticket price'
				}
			}
		},
		tooltips: {
			mode: 'nearest',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: false
		},
		pan: {
			enabled: true,
			mode: 'x',
			rangeMax: {
				x: 4000
			},
			rangeMin: {
				x: 0
			}
		}
	}
}

// chart of chartjs
window.myChart = new Chart(ctx, config);

// for every messages from server
socket.addEventListener('message', (event) => {
    json = event.data.toString()
	temp_data = JSON.parse(json)
	// whole data that we have for start of ticker monitoring
	if (temp_data.length > 1) {
		ticker_data = temp_data
		config.data.datasets[0].data = ticker_data
		config.data.datasets[0].label = current_ticker
		ticker_data.forEach((element) => {
			config.data.datasets[0].data.push({
				x: Date.parse(element.time),
				y: element.price
			})
		})
	} else if (temp_data.length == 1) {  // case of additional data
		config.data.datasets[0].data.push({
			x: Date.parse(temp_data[0].time),
			y: temp_data[0].price
		})
	}
	window.myChart.update()
})

// every select changing is a signal to send request to server
select.addEventListener("change", (event) => {
	config.data.datasets[0].data = []
	current_ticker = event.target.value
	console.log('current_ticker', current_ticker)
	socket.send('get_all_items_' + current_ticker)
	// send request for monitoring every second
	let myInterval = setInterval(function() {
		socket.send('get_last_item' + current_ticker)
	}, 1000);
})

// not to wait at start but have some first graph
window.onload = function() {
	const e = new Event("change")
	select.dispatchEvent(e);
}