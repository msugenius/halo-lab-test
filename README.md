# Halo Lab test task

This application is a test task for Halo Lab.


## Installation

To install the project, you need Docker Engine and free port 80. You can find instructions for installing Docker [here](https://docs.docker.com/get-docker/).

Firstly you need to clone repo.
```bash
  git clone https://github.com/msugenius/halo-lab-test.git
```

Next, you need to copy the .env.example file to create a .env file in the server directory and fill in the value of the DATABASE_URL property. Now all that remains is to build our container:
```bash
  cd halo-lab-test 
  docker compose up -d
```
## Usage/Examples
The application has only two endpoints:

- Endpoint to check server status
```javascript
http://localhost/healthcheck
``` 
- Endpoint to get info about film by title
```javascript
http://localhost/film/:title
``` 

## Documentation & Workflow explanation

After request, the following will happen:

- The application will check the NodeJS cache, and if there is information about the movie there, it will be returned to the user.
- If there is no information in the application cache, the Redis cache will be checked next. If there is information about the movie there, it will be returned to the user.
- If there is no data in the Redis cache either, a query will be made to the database and the data will be returned.

If there is no information about such a movie, the following will be returned:
```javascript
Error: "There isn't enough info about this film in our DB."
```
Regardless of the result of the Redis cache and application cache will be updated.
