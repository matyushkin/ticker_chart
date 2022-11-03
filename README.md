# Ticker chart

Simple tool for tickers monitoring. Local dev server starts at [http://127.0.0.1:8000/](http://127.0.0.1:8000/) with `docker-compose -f local.yml up`.

The service implements an example of generating realtime data. It returns new prices once per second for 100 artificial trading instruments: `ticker_00`, `ticker_01`, `...`, `ticker_99`. Random deviations are used as a price change function for each instrument.

Ticker chart allows you to select a ticker using the drop-down list and display the price chart for the selected instrument from the initial moment, adding data as it becomes available.

The service is based on the following stack: Django as a backend framework, a PostgreSQL database, and the Chart.js frontend library for real-time price charting. The frontend and backend parts communicate using websockets.

A small test of the service is shown in the video below.

https://user-images.githubusercontent.com/4839771/199847912-e9a3c507-7f7d-44d7-90fc-87adddddfb0b.mp4

[![Built with Cookiecutter Django](https://img.shields.io/badge/built%20with-Cookiecutter%20Django-ff69b4.svg?logo=cookiecutter)](https://github.com/cookiecutter/cookiecutter-django/)
[![Black code style](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/ambv/black)
