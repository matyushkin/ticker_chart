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


function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

for (var i = 0; i < numberOfTickers; i++) {
	const option = document.createElement("option");
	option.value = pad(i, 2);
	option.innerText = "ticker_" + option.value;
	select.appendChild(option);
}


let config = {
	type: 'line',
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

window.myChart = new Chart(ctx, config);

socket.addEventListener('message', (event) => {
    json = event.data.toString()
    ticker_data = JSON.parse(json)
	config.data.datasets[0].data = ticker_data
	config.data.datasets[0].label = current_ticker
	ticker_data.forEach((element) => {
		config.data.datasets[0].data.push({
			x: Date.parse(element.time),
			y: element.price
		})
	})
	window.myChart.update()
})

select.addEventListener("change", (event) => {
	config.data.datasets[0].data = []
	current_ticker = event.target.value
	console.log('current_ticker', current_ticker)
	socket.send('get_all_items_' + current_ticker)
})


window.onload = function() {
	socket.send('get_all_items_' + current_ticker)
	ticker_data.forEach((element) => {
		config.data.datasets[0].data.push({
			x: Date.parse(element.time),
			y: element.price
		})
	})
	window.myChart.update()
}

var myInterval = setInterval(function() {
	console.log('test', Date.now())
}, 1000);