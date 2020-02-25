build:
	docker build -t visualize-gpx:latest .

save:
	docker save visualize-gpx:latest > visualize-gpx_save.tar
