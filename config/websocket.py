import json
from datetime import datetime
from django.core import serializers

from generator.models import Ticker

from asgiref.sync import sync_to_async


def json_serial(obj):
    """JSON serializer for datetime objects"""
    if isinstance(obj, (datetime)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))


def model_to_json(data):
    dict_data = serializers.serialize("python", data)
    actual_data = [d['fields'] for d in dict_data]
    json_data = json.dumps(actual_data, default=json_serial)
    return json_data


@sync_to_async
def get_all_items(ticker_name):
    data = Ticker.objects.filter(name=ticker_name)
    return model_to_json(data)


@sync_to_async
def get_last_item(ticker_name):
    data = [Ticker.objects.filter(name=ticker_name).last()]
    return model_to_json(data)


async def websocket_application(scope, receive, send):
    while True:
        event = await receive()

        if event["type"] == "websocket.connect":
            await send({"type": "websocket.accept"})

        if event["type"] == "websocket.disconnect":
            break

        if event["type"] == "websocket.receive":
            # If message from frontend is get_all_items_NN
            if event["text"].startswith("get_all_items"):
                ticker_name = f"ticker_{event['text'][-2:]}"
                data = await get_all_items(ticker_name)
            if event["text"].startswith("get_last_item"):
                ticker_name = f"ticker_{event['text'][-2:]}"
                data = await get_last_item(ticker_name)
            await send({"type": "websocket.send", "text": data})
