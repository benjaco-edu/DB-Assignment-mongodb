## Assignment 2 - MongoDB

- load script
- mongo queries
    - How many Twitter users are in the database?
    - Which Twitter users link the most to other Twitter users? (Provide the top ten.)
    - Who is are the most mentioned Twitter users? (Provide the top five.)
    - Who are the most active Twitter users (top ten)?
    - Who are the five most grumpy (most negative tweets) and the most happy (most positive tweets)?
- has to be accessible though API, a CLI UI, a GUI, or a Web-based UI.


## Solution

Nodejs app accessible though http

### Endpoints
- http://localhost:8080/no_of_users
- http://localhost:8080/top_linker
- http://localhost:8080/top_mentioned
- http://localhost:8080/most_active
- http://localhost:8080/most_extreme

## Run it

_requires docker_

```
sudo docker run --rm --publish=27017:27017 --name dbms -d mongo
sudo docker run -it --link dbms:mongo -p 8080:8080 --rm bslcphbussiness/db-mongo-twitter
```

### Clean up

`sudo docker rmi bslcphbussiness/db-mongo-twitter`
`sudo docker stop dbms`