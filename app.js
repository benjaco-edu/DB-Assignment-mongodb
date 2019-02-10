const {spawn} = require('child_process');
const loadData = require("./loadData")

const express = require('express');
const app = express();

/**
 * @type {Collection}
 * */
let collection;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://mongo/tweeter-assignment";


// How many Twitter users are in the database?
app.get("/no_of_users", async (req, res) => {
    res.json({
        count: (await collection.distinct("user")).length
    })
});

// Which Twitter users link the most to other Twitter users? (Provide the top ten.)
app.get("/top_linker", async (req, res) => {
    res.json(
        await collection.aggregate([
            {$unwind: "$mentions"},
            {$group: {_id: "$user", count: {$sum: 1}}},
            {$sort: {count: -1}},
            {$limit: 10}
        ])
            .toArray()
    )
});

// Who is are the most mentioned Twitter users? (Provide the top five.)
app.get("/top_mentioned", async (req, res) => {
    res.json(
        await collection.aggregate([
            {$unwind: "$mentions"},
            {$group: {_id: "$mentions", count: {$sum: 1}}},
            {$sort: {count: -1}},
            {$limit: 5}
        ])
            .toArray()
    )
});

// Who are the most active Twitter users (top ten)?
app.get("/most_active", async (req, res) => {
    res.json(
        await collection.aggregate([
            {$group: {_id: "$user", count: {$sum: 1}}},
            {$sort: {count: -1}},
            {$limit: 10}
        ])
            .toArray()
    )
});

// Who are the five most grumpy (most negative tweets) and the most happy (most positive tweets)?
app.get("/most_extreme", async (req, res) => {
    res.json({
        happy: await collection.aggregate([
            {$group: {_id: "$user", avgPolarity: {$avg: "$polarity"}, noOfTweets: {$sum: 1}}},
            {$sort: {avgPolarity: -1, noOfTweets: -1}},
            {$limit: 10}
        ], {allowDiskUse: true}).toArray(),

        grumpy: await collection.aggregate([
            {$group: {_id: "$user", avgPolarity: {$avg: "$polarity"}, noOfTweets: {$sum: 1}}},
            {$sort: {avgPolarity: 1, noOfTweets: -1}},
            {$limit: 10}
        ], {allowDiskUse: true}).toArray()
    })
});



const child = spawn('./downloaddata.sh');
child.stdout.on('data', (data) => {
    process.stdout.write(data)
});

child.stderr.on('data', (data) => {
    process.stdout.write(data)

});
child.on('close', (code) => {
    MongoClient.connect(url, {useNewUrlParser: true}, async function (err, con) {
        if (err) throw err;

        await loadData(con);

        const db = con.db("tweeter-assignment");
        collection = db.collection("tweets");

        app.listen(8080, function () {
            console.log("server is running")
        });
    });
});

