docker-compose build
docker tag gcr.io/qualitool/qualitool_be:latest gcr.io/qualitool/qualitool_be:0.0.3
docker tag gcr.io/qualitool/qualitool_fe:latest gcr.io/qualitool/qualitool_fe:0.0.3
docker push gcr.io/qualitool/qualitool_be
docker push gcr.io/qualitool/qualitool_be:0.0.3
docker push gcr.io/qualitool/qualitool_fe
docker push gcr.io/qualitool/qualitool_fe:0.0.3