# Live Control Web Player

## Setup

There are a couple of prerequisites you will need in order for this project to work:

1. Be sure to have `ffmpeg` installed [http://ffmpeg.org](http://ffmpeg.org/).
2. Be sure to have `Docker` and `docker-compose` installed.
   - [https://www.docker.com/](https://www.docker.com/)
   - [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

This project will spawn a Docker container containing a PostgreSQL server which is why we need DOcker installed and running.

## Upload

Place video in `/video` folder within the root of the project. This folder is seen as the upload stream buffer for the purposes of this exercise.

## Annnnd Go!

```bash
$ yarn

$ yarn dev
```

Site will be served off of [http://localhost:8080/](http://localhost:8080/).