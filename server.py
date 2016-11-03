from bottle import route, hook, response, run, static_file
import random

words = tuple(set(map(lambda x:x.lower().strip(), open('words.txt').read().splitlines())))

@hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'

@route('/')
def root():
	return static_file('index.html', 'static')

@route('/word')
def index():
    return random.choice(words)

@route('/static/<filename>')
def static_files(filename):
	return static_file(filename, 'static')

run(host = '0.0.0.0', port = 8080, server = 'tornado')
