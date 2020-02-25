build:
	docker build -t visualize-gpx:latest .

save:
	docker save visualize-gpx:latest > visualize-gpx.tar && scp visualize-gpx.tar syn:./images && rm visualize-gpx.tar
