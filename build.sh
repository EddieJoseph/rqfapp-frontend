docker-compose -f docker-compose-build.yml build
docker push gcr.io/qualitool/qualitool_be:latest
docker push gcr.io/qualitool/qualitool_fe:latest
if [ $# -eq 1 ]
	then
	docker tag gcr.io/qualitool/qualitool_be:latest gcr.io/qualitool/qualitool_be:$1
	docker tag gcr.io/qualitool/qualitool_fe:latest gcr.io/qualitool/qualitool_fe:$1
	docker push gcr.io/qualitool/qualitool_be:$1
	docker push gcr.io/qualitool/qualitool_fe:$1
fi
