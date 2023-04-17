FROM debian:bullseye

ARG USER=foodtrucks
ENV USER=${USER}

COPY ./apt-list.dat /tmp

RUN	apt update; \
    xargs apt install -y -qq < /tmp/apt-list.dat; \
    useradd -m ${USER};

WORKDIR /home/user

COPY ./src ./ft
RUN chown -R ${USER}:${USER} ./ft

USER ${USER}
WORKDIR /home/user/ft

CMD ["/bin/bash", "-c", "tail -f /dev/null"]