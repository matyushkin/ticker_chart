/* Project specific Javascript goes here. */
let url = `ws://${window.location.host}/ws/socket-server/`;
let socket = new WebSocket(url) 
let json
let current_ticker = 'ticker_00'
let ticker_data = []
const numberOfTickers = 100;
const select = document.getElementById("ticker-choose");


socket.addEventListener('message', (event) => {
    json = event.data.toString()
    ticker_data = JSON.parse(json)
	console.log(ticker_data)
});


function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

for (var i = 0; i < numberOfTickers; i++) {
	const option = document.createElement("option");
	option.value = "ticker_" + pad(i, 2);
	option.innerText = option.value;
	select.appendChild(option);
}

select.addEventListener("change", (event) => {
	current_ticker = event.target.value
	console.log('current_ticker', current_ticker);
})

// var chartColors = {
// 	red: 'rgb(255, 99, 132)',
// 	orange: 'rgb(255, 159, 64)',
// 	yellow: 'rgb(255, 205, 86)',
// 	green: 'rgb(75, 192, 192)',
// 	blue: 'rgb(54, 162, 235)',
// 	purple: 'rgb(153, 102, 255)',
// 	grey: 'rgb(201, 203, 207)'
// };

// var config = {
// 	type: 'line',
// 	data: {
// 		datasets: [{
// 			label: 'Ticker 00',
// 			backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
// 			borderColor: chartColors.red,
// 			fill: false,
// 			lineTension: 0,
// 			borderDash: [8, 4],
// 			data: []
// 		}]
// 	},
// 	options: {
// 		title: {
// 			display: true,
// 			text: 'Data labels plugin sample'
// 		},
// 		scales: {
// 			xAxes: [{
// 				type: 'linear',
// 				display: true,
// 				scaleLabel: {
// 					display: true,
// 					labelString: 'Time'
// 				}
// 			}],
// 			yAxes: [{
// 				type: 'linear',
// 				display: true,
// 				scaleLabel: {
// 					display: true,
// 					labelString: 'Ticker price'
// 				}
// 			}]
// 		},
// 		tooltips: {
// 			mode: 'nearest',
// 			intersect: false
// 		},
// 		hover: {
// 			mode: 'nearest',
// 			intersect: false
// 		},
// 		pan: {
// 			enabled: true,
// 			mode: 'x',
// 			rangeMax: {
// 				x: 4000
// 			},
// 			rangeMin: {
// 				x: 0
// 			}
// 		},
// 		zoom: {
// 			enabled: true,
// 			mode: 'x',
// 			rangeMax: {
// 				x: 20000
// 			},
// 			rangeMin: {
// 				x: 1000
// 			}
// 		}
// 	}
// };

// window.onload = function() {
// 	var ctx = document.getElementById('myChart').getContext('2d');
// 	window.myChart = new Chart(ctx, config);
// };

// document.getElementById('randomizeData').addEventListener('click', function() {
// 	config.data.datasets.forEach(function(dataset) {
// 		dataset.data.forEach(function(dataObj) {
// 			dataObj.y = randomScalingFactor();
// 		});
// 	});

// 	window.myChart.update();
// });

// // var colorNames = Object.keys(chartColors);
// // document.getElementById('addDataset').addEventListener('click', function() {
// // 	var colorName = colorNames[config.data.datasets.length % colorNames.length];
// // 	var newColor = chartColors[colorName];
// // 	var newDataset = {
// // 		label: 'Dataset ' + (config.data.datasets.length + 1),
// // 		backgroundColor: color(newColor).alpha(0.5).rgbString(),
// // 		borderColor: newColor,
// // 		fill: false,
// // 		lineTension: 0,
// // 		data: []
// // 	};

// // 	config.data.datasets.push(newDataset);
// // 	window.myChart.update();
// // });

// // document.getElementById('removeDataset').addEventListener('click', function() {
// // 	config.data.datasets.pop();
// // 	window.myChart.update();
// // });

// // document.getElementById('addData').addEventListener('click', function() {
// // 	onRefresh(window.myChart);
// // 	window.myChart.update();
// // });

// document.getElementById('resetZoom').addEventListener('click', function() {
// 	window.myChart.resetZoom();
// });









// // ---------

// // var chartColors = {
// // 	red: 'rgb(255, 99, 132)',
// // 	orange: 'rgb(255, 159, 64)',
// // 	yellow: 'rgb(255, 205, 86)',
// // 	green: 'rgb(75, 192, 192)',
// // 	blue: 'rgb(54, 162, 235)',
// // 	purple: 'rgb(153, 102, 255)',
// // 	grey: 'rgb(201, 203, 207)'
// // };

// // function randomScalingFactor() {
// // 	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
// // }

// // function onRefresh(chart) {
// // 	var now = Date.now();
// // 	chart.data.datasets.forEach(function(dataset) {
// // 		dataset.data.push({
// // 			x: now,
// // 			y: randomScalingFactor()
// // 		});
// // 	});
// // }

// // var color = Chart.helpers.color;
// // var config = {
// // 	type: 'line',
// // 	data: {
// // 		datasets: [{
// // 			label: 'Dataset 1 (linear interpolation)',
// // 			backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
// // 			borderColor: chartColors.red,
// // 			fill: false,
// // 			lineTension: 0,
// // 			borderDash: [8, 4],
// // 			data: []
// // 		}, {
// // 			label: 'Dataset 2 (cubic interpolation)',
// // 			backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
// // 			borderColor: chartColors.blue,
// // 			fill: false,
// // 			cubicInterpolationMode: 'monotone',
// // 			data: []
// // 		}]
// // 	},
// // 	options: {
// // 		title: {
// // 			display: true,
// // 			text: 'Data labels plugin sample'
// // 		},
// // 		scales: {
// // 			xAxes: [{
// // 				type: 'realtime',
// // 				realtime: {
// // 					duration: 20000,
// // 					refresh: 1000,
// // 					delay: 2000,
// // 					onRefresh: onRefresh
// // 				}
// // 			}],
// // 			yAxes: [{
// // 				type: 'linear',
// // 				display: true,
// // 				scaleLabel: {
// // 					display: true,
// // 					labelString: 'Ticker price'
// // 				}
// // 			}]
// // 		},
// // 		tooltips: {
// // 			mode: 'nearest',
// // 			intersect: false
// // 		},
// // 		hover: {
// // 			mode: 'nearest',
// // 			intersect: false
// // 		},
// // 		pan: {
// // 			enabled: true,
// // 			mode: 'x',
// // 			rangeMax: {
// // 				x: 4000
// // 			},
// // 			rangeMin: {
// // 				x: 0
// // 			}
// // 		},
// // 		zoom: {
// // 			enabled: true,
// // 			mode: 'x',
// // 			rangeMax: {
// // 				x: 20000
// // 			},
// // 			rangeMin: {
// // 				x: 1000
// // 			}
// // 		}
// // 	}
// // };

// // window.onload = function() {
// // 	var ctx = document.getElementById('myChart').getContext('2d');
// // 	window.myChart = new Chart(ctx, config);
// // };

// // document.getElementById('randomizeData').addEventListener('click', function() {
// // 	config.data.datasets.forEach(function(dataset) {
// // 		dataset.data.forEach(function(dataObj) {
// // 			dataObj.y = randomScalingFactor();
// // 		});
// // 	});

// // 	window.myChart.update();
// // });

// // var colorNames = Object.keys(chartColors);
// // document.getElementById('addDataset').addEventListener('click', function() {
// // 	var colorName = colorNames[config.data.datasets.length % colorNames.length];
// // 	var newColor = chartColors[colorName];
// // 	var newDataset = {
// // 		label: 'Dataset ' + (config.data.datasets.length + 1),
// // 		backgroundColor: color(newColor).alpha(0.5).rgbString(),
// // 		borderColor: newColor,
// // 		fill: false,
// // 		lineTension: 0,
// // 		data: []
// // 	};

// // 	config.data.datasets.push(newDataset);
// // 	window.myChart.update();
// // });

// // document.getElementById('removeDataset').addEventListener('click', function() {
// // 	config.data.datasets.pop();
// // 	window.myChart.update();
// // });

// // document.getElementById('addData').addEventListener('click', function() {
// // 	onRefresh(window.myChart);
// // 	window.myChart.update();
// // });

// // document.getElementById('resetZoom').addEventListener('click', function() {
// // 	window.myChart.resetZoom();
// // });