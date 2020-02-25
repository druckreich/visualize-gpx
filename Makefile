build:
	docker build -t druckreich/visualize-gpx:latest .

push:
	docker push druckreich/visualize-gpx:latest

publish: build && push
