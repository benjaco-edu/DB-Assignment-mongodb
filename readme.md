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


### Output
```
http://localhost:8080/no_of_users
{
count: 659775
}


http://localhost:8080/top_linker
[
{
_id: "lost_dog",
count: 549
},
{
_id: "dogzero",
count: 334
},
{
_id: "tweetpet",
count: 310
},
{
_id: "VioletsCRUK",
count: 296
},
{
_id: "tsarnick",
count: 258
},
{
_id: "SongoftheOss",
count: 257
},
{
_id: "what_bugs_u",
count: 246
},
{
_id: "Karen230683",
count: 244
},
{
_id: "keza34",
count: 239
},
{
_id: "SallytheShizzle",
count: 234
}
]


http://localhost:8080/top_mentioned
[
{
_id: "@mileycyrus",
count: 4500
},
{
_id: "@tommcfly",
count: 3887
},
{
_id: "@ddlovato",
count: 3467
},
{
_id: "@DavidArchie",
count: 1299
},
{
_id: "@Jonasbrothers",
count: 1287
}
]


http://localhost:8080/most_active
[
{
_id: "lost_dog",
count: 549
},
{
_id: "webwoke",
count: 345
},
{
_id: "tweetpet",
count: 310
},
{
_id: "SallytheShizzle",
count: 281
},
{
_id: "VioletsCRUK",
count: 279
},
{
_id: "mcraddictal",
count: 276
},
{
_id: "tsarnick",
count: 248
},
{
_id: "what_bugs_u",
count: 246
},
{
_id: "Karen230683",
count: 238
},
{
_id: "DarkPiano",
count: 236
}
]



http://localhost:8080/most_extreme
{
happy: [
{
_id: "what_bugs_u",
avgPolarity: 4,
noOfTweets: 246
},
{
_id: "KevinEdwardsJr",
avgPolarity: 4,
noOfTweets: 171
},
{
_id: "whitsundays",
avgPolarity: 4,
noOfTweets: 144
},
{
_id: "longestpoem",
avgPolarity: 4,
noOfTweets: 116
},
{
_id: "tweeteradder7",
avgPolarity: 4,
noOfTweets: 114
},
{
_id: "figPYBFO",
avgPolarity: 4,
noOfTweets: 114
},
{
_id: "tweeteradder2",
avgPolarity: 4,
noOfTweets: 113
},
{
_id: "5toSucceed",
avgPolarity: 4,
noOfTweets: 109
},
{
_id: "BlokesLib",
avgPolarity: 4,
noOfTweets: 109
},
{
_id: "redrobinrockn",
avgPolarity: 4,
noOfTweets: 107
}
],
grumpy: [
{
_id: "lost_dog",
avgPolarity: 0,
noOfTweets: 549
},
{
_id: "tweetpet",
avgPolarity: 0,
noOfTweets: 310
},
{
_id: "TheAmazingCat",
avgPolarity: 0,
noOfTweets: 86
},
{
_id: "nova937music",
avgPolarity: 0,
noOfTweets: 67
},
{
_id: "Nathan133",
avgPolarity: 0,
noOfTweets: 51
},
{
_id: "WallTweet",
avgPolarity: 0,
noOfTweets: 50
},
{
_id: "mariaeduardab",
avgPolarity: 0,
noOfTweets: 49
},
{
_id: "Hugasaurus",
avgPolarity: 0,
noOfTweets: 46
},
{
_id: "redvers",
avgPolarity: 0,
noOfTweets: 42
},
{
_id: "Roxie22",
avgPolarity: 0,
noOfTweets: 42
}
]
}
```
