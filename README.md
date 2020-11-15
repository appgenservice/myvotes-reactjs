# Charging Point Management
A simple implementation on Charging Point Management System

## Run

Install npm modules
```bash
$ npm install
```

Start the application
```bash
$ npm start
```

How to generate docker image?
docker build -t cpm:dev .

How to run reactjs docker image?
docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    cpm:dev
