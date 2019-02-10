const fs = require("fs");
const fastCsv = require("fast-csv");


const loadData = async (con) => {
    return new Promise((resolve, reject) => {


        console.log("Connected to mongo, loading in data...");

        const db = con.db("tweeter-assignment");


        const fileStream = fs.createReadStream(__dirname + "/training.1600000.processed.noemoticon.csv"),
            parser = fastCsv({headers: true});


        fileStream
            .on("readable", function () {
                var data;
                while ((data = fileStream.read()) !== null) {
                    // yes, it should wait
                    parser.write(data);
                }
            })
            .on("end", function () {
                parser.end();
            });

        parser
            .on("readable", async function () {
                var data;
                var buffer = [];
                while ((data = parser.read()) !== null) {
                    data.date = new Date(data.date);
                    data.polarity = parseInt(data.polarity);
                    data.mentions = data.text.match(/(@\w+)/g) || [];

                    buffer.push(data);
                    if (buffer.length > 10000) {
                        console.log("10k insert");
                        await db.collection("tweets").insertMany(buffer)
                    }
                }
                await db.collection("tweets").insertMany(buffer)
            })
            .on("end", async function () {
                await db.collection("tweets").createIndex({"user": 1});

                console.log("\ndone");
                resolve()
            });


    });

};
module.exports = loadData;