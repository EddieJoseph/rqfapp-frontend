certutil.exe -addstore root .\qualitool.cert.pem
keytool -delete -alias localhost -keystore $env:JAVA_HOME\lib\security\cacerts -storepass changeit -noprompt
keytool -import -alias localhost -file .\qualitool.cert.pem -keystore $env:JAVA_HOME\lib\security\cacerts -storepass changeit -noprompt