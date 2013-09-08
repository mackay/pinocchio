#!/usr/bin/python
from bottle import route, run, static_file, app


@route('/')
def root():
    return static_file("pinocchio.html", root='./')

@route('/<filename:path>')
def static(filename):
    return static_file(filename, root='./')

for defined_route in app().routes:
    print defined_route.method, "\t", defined_route.rule

run(host='localhost', port=8080)