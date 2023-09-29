#!/usr/bin/env bash

set -eux

export MSYS_NO_PATHCONV=1

docker run --rm -it --name mongo5 \
  -p 127.0.0.1:27017:27017 \
  -v $PWD/replica-init.js:/docker-entrypoint-initdb.d/replica-init.js \
   mongo:5.0 --replSet=rs0