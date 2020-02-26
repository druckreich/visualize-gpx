image_name=druckreich/visualize-gpx:alpine

build:
	docker build -t ${image_name} .

serve:
	docker run --rm -it -d -p 80:8080 ${image_name}

push:
	docker push ${image_name}

publish: build push
