#!/bin/bash

set -xe

echo -----------------------------
echo Stopping nginx because we are going to use caddy for reverse proxy
systemctl stop nginx


echo -----------------------------
echo Starting the app
cd /app/sensitqube.github.io/


# Using port 8080 for the app as caddy will need both port 80(http) and port 443(https) to run
export PORT=8080
nohup node server.js > server.log &


echo ---------------------------
echo Starting caddy
nohup caddy reverse-proxy --from sensitqube.com --to http://localhost:8080 > caddy.log &


