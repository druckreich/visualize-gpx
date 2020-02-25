build:
	docker build -t druckreich/visualize-gpx:latest .

serve:
	docker run --rm -it -d -p 80:8080 druckreich/visualize-gpx:latest

push:
	docker push druckreich/visualize-gpx:latest

publish: build push
