# Food Truck CLI

## Direct shell run
(This assumes the file is already marked `+x` and your environment contains/supports the requisite binaries.)
```shell
> cd cli/build/src
> ./foodtrucks.sh
```

## Docker/Podman
(The container uses Debian Bullseye.  This assumes you have Docker/Podman installed and running.)

You can do one of two things:  build and run the container directly from the `./build/Dockerfile`, or you can run the `./build/build.sh` script.

The advantage of the "build" script is detection of `docker` or `podman` and some other helpful bits.