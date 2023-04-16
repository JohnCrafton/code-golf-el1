#!/bin/bash

# UTILITIES
log() {
	echo " "
	echo "$(date +%Y%m%dT%H:%M):  $@"
}

die() {
	log "$@"
	exit 1
}

bold=$(tput bold)
normal=$(tput sgr0)
lightblue=$(tput setaf 6)
# /UTILITIES

# DEFAULTS
DEFAULT_URL="https://data.sfgov.org/resource/rqzj-sfat.json"
# /DEFAULTS

# TASKS
# look for adjacent `trucks.json` file
#   if not found, download it from https://data.sfgov.org/resource/rqzj-sfat.json (or specified URL option?)
#
# parse the JSON file and discard anything that doesn't exist by checking the status field for ISSUED
#   if the JSON file is empty, exit with "sorry, no trucks approved for operation today"
#
# if there's time, get the current location of the user and sort by distance with the closest truck first
#   if the user doesn't want to share their location, sort by name
#   when displaying, show the distance from the user to the truck next to the name and today's hours (or CLOSED)
#      if there's a menu, show a link to the menu
#      if there's a website, show a link to the website

# parse the command line options
while getopts ":u:" opt; do
  case $opt in
    u)
      log "Using URL $OPTARG"
      JSON_URL=$OPTARG
      ;;
    \?)
      log "Invalid option: -$OPTARG"
      ;;
  esac
done

# check for curl, sed, jq
log "Checking for required tools..."
hash curl 2>/dev/null || die "no curl"
hash sed 2>/dev/null || die "no sed"
hash jq 2>/dev/null || die "no jq"

# check for the trucks.json file
log "Checking for trucks.json..."
if [ -f trucks.json ]; then
  log "Found trucks.json"
else
  log "Downloading trucks.json"
  if [ -z "$JSON_URL" ]; then
    JSON_URL=$DEFAULT_URL
  fi
  curl -o trucks.json $JSON_URL
fi

# filter only ISSUED status trucks
jq -c '.[] | select(.status == "ISSUED")' trucks.json > current_trucks.json

# take current_trucks.json and output a list of trucks with name, address, hours, and a link to the schedule
jq -s -c '.[] | {name: .applicant, address: .address, description: .locationdescription, hours: .dayshours, food_items: .fooditems}' \
    current_trucks.json > current_trucks_list.json

# if the list is empty, exit with "sorry, no trucks approved for operation today"; otherwise, pretty print the current trucks
[ -s current_trucks_list.json ] || die "sorry, no trucks approved for operation today"

echo " "
echo " "
echo "${bold}${lightblue}Here are your options today${normal}:"

cat ./food_truck.dat

# pretty print the current trucks
jq '.' current_trucks_list.json
