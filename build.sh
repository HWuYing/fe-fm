#!/bin/sh
time1=$(date "+%s")

export javaHost=\"http://192.168.122.172:8080\"

npm i
npm run build

docker stop fe-erp-container
docker rm fe-erp-container
docker build -t fe-erp .
docker run -d --name fe-erp-container -p 3000:3000 fe-erp

time2=$(date "+%s")
echo $((($time2 - $time1) * 1000))
