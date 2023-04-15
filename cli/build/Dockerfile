# Dockerfile attribution section with author and license information


FROM ubuntu:18.04

RUN apt-get update && apt-get install -y \
    bash git vim \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m -u 1000 -U -s /bin/bash user

USER 1000
WORKDIR /home/user