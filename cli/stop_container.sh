#!/bin/bash

if [[ -z ${1} ]]; then
	CONTAINER_NAME=sf_food_trucks_cli
else
	CONTAINER_NAME=${1}
fi

echo "Attempting stop of container ${CONTAINER_NAME}..."
docker stop $(docker ps -q --filter name=${CONTAINER_NAME})
