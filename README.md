# aws-cache
Simple framework utilizing Redis for basic AWS Elasticache with a Node.js Docker container

## Running
Make sure to have [Docker](https://www.docker.com/) installed
```
#Commands run within root directory of git repo
docker build -t cache-test .
docker run -p 49160:8080 -d cache-test

docker logs <containerID>
docker stop <containerID>
```
## Usage
Endpoint can be accessed either via cURL or localhost
```
curl -i localhost:491680/<key>
```
