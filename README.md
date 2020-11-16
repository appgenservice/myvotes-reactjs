# Charging Point Management
cpm-ui is a simple reactjs based frontend application to display charging point management dashboard.

This frontend code access cpm-backend rest endpoints and does below
1. Display Charging points and its details in Charging Point Management dashboard
2. Allow users to Plug a new card into and free Charging Point
3. Allow users to UnPlug a car from Charging Point

Access running Charging Point Management UI here: http://appgenservice.com:9089/

#### How to Run? ####

Install npm modules
```bash
$ npm install
```

Start the application
> Set REACT_APP_API_URL variable value to specify backend service base URL

```bash
$ REACT_APP_API_URL=http://localhost:8080 npm start
```
#### How to access UI? #####



#### How to generate docker image?
docker build -t cpm:dev .

#### For production build #####
npm run build
npm install -g serve
serve -s build

Access UI:

#### How to run reactjs docker image?
docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 9089:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    cpm:dev


#### TODO: ####
* No user management or security implemented
* Would be nice to have front end data access layer separated out
* Improve UI look and feel
* Add responsiveness to UI to adopt to UI size
