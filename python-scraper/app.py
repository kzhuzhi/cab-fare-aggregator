from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

@app.route('/grab')
def grab():
    start = request.args.get('start')
    end = request.args.get('end')
    time.sleep(0.2)
    data = {
        'provider': 'grab',
        'rides': [
            {'type': 'GrabCar', 'fare_min': 12.5, 'fare_max': 18.0, 'eta': 5, 'surge': 1.0},
            {'type': 'GrabPremium', 'fare_min': 22.0, 'fare_max': 30.0, 'eta': 4, 'surge': 1.2}
        ]
    }
    return jsonify(data)

@app.route('/tada')
def tada():
    start = request.args.get('start')
    end = request.args.get('end')
    time.sleep(0.25)
    data = {
        'provider': 'tada',
        'rides': [
            {'type': 'TADA-Sedan', 'fare_min': 11.0, 'fare_max': 16.0, 'eta': 6, 'surge': 1.0},
            {'type': 'TADA-X', 'fare_min': 19.0, 'fare_max': 25.0, 'eta': 7, 'surge': 1.1}
        ]
    }
    return jsonify(data)

@app.route('/health')
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)