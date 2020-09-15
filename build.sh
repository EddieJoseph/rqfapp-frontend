docker-compose -f docker-compose-build.yml build
docker tag gcr.io/qualitool/qualitool_be:latest gcr.io/qualitool/qualitool_be:$1
docker tag gcr.io/qualitool/qualitool_fe:latest gcr.io/qualitool/qualitool_fe:$1
docker push gcr.io/qualitool/qualitool_be
docker push gcr.io/qualitool/qualitool_be:$1
docker push gcr.io/qualitool/qualitool_fe
docker push gcr.io/qualitool/qualitool_fe:$1