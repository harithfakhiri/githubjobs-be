# githubjobs-be

## !important notes
make sure to already have mysql first in your local

before starting, make user to setup .env
AUTH_TOKEN_SECRET=
DB_NAME=
USER_DB=
PASS_DB=


## !important notes
you cannot insert username and password manually to DB, since the password is hashed by bcrypt
to insert data, use postman or similar to request post to 
http://localhost:5400/api/register

example body
{
    "username" : "yoww12",
    "password" : "harith112"
}


npm i first to install all dependencies
Run node app.js or 

npm i -g nodemon 
using nodemon js to start

not yet --> pagination