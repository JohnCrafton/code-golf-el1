#!/bin/bash

log() {
	echo " "
	echo "$(date +%Y%m%dT%H:%M):  $@"
}

die() {
	log "$@"
	exit 1
}

# Check system-level dependencies
hash sed 2>/dev/null || die "sed not found"
hash netstat 2>/dev/null || die "netstat not found"

# Check for Podman; if no Podman, then Docker
if [[ -z $(which podman) ]]; then
	hash docker 2>/dev/null || die "docker not found"
	DOCKER=docker
else
	hash podman 2>/dev/null || die "podman not found"
	DOCKER=podman
fi

# Project Defaults
DEFAULT_DISTRO=bullseye
DEFAULT_USERNAME=foodtrucks
DEFAULT_HOSTNAME=sf_ft_cli
DEFAULT_TAG_NAME=sf_ft_cli

log "Setting up the project..."

# Create "dependencies" for the Dockerfile
touch apt-list.dat
touch food_truck.dat

echo " "
read -p "Username for the container-user (${DEFAULT_USERNAME}):  " USERNAME
if [[ -z ${USERNAME} ]]; then
	USERNAME=${DEFAULT_USERNAME}
fi

# Swap username
$(which sed) -i "s/USER=user/USER=${USERNAME}/g" Dockerfile

echo " "
read -p "Debian distro (${DEFAULT_DISTRO}): " DISTRO
if [[ -z ${DISTRO} ]]; then
	DISTRO=${DEFAULT_DISTRO}
fi

# Swap distros
$(which sed) -i "s/:bullseye/:${DISTRO}/g" Dockerfile

echo " "
read -p "Container tag (${DEFAULT_TAG_NAME}): " TAG_NAME
if [[ -z ${TAG_NAME} ]]; then
	TAG_NAME=${DEFAULT_TAG_NAME}
fi

echo " "
read -p "Hostname (${DEFAULT_HOSTNAME}): " HOSTNAME
if [[ ! -z ${HOSTNAME} ]]; then
	HOSTNAME_OPTION="--hostname=${HOSTNAME}"
else
	HOSTNAME_OPTION="--hostname=${DEFAULT_HOSTNAME}"
fi

log "Building image with your parameters..."
${DOCKER} build --no-cache --pull ${BUILD_OPTIONS} . -t ${TAG_NAME}

echo " "
read -p "Build complete.  Start the container? (y/N):  " START_IT && \
	[[ ${START_IT} == [yY] ]] || exit 1

log "Starting the container..."
log "(May take a moment; the ID should appear if creation succeeds.)"
${DOCKER} run -d --rm --name sf_food_truck_cli "${HOSTNAME_OPTION}" ${TAG_NAME}

log " "
log "Docker or Podman commands should interchange freely; substitute 'docker'"
log "with 'podman' as needed in the commands below."

log "To view the container status:"
log "[ docker|podman ps --filter name=sf_food_truck_cli --no-trunc ]"

log "To stop the container:"
log "[ docker|podman stop \$(docker|podman ps -q --filter name=sf_food_truck_cli) ]"
