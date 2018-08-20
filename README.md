# aws-cache
## Running
Make sure to have [Docker](https://www.docker.com/) installed
```
docker build -t cache-test .
docker run -p 49160:8080 -d cache-test

docker logs <containerID>
docker stop <containerID>
```
