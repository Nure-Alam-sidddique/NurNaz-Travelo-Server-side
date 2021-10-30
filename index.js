const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
//  server require
const { MongoClient } = require("mongodb");
require('dotenv').config();
const uri =
    `mongodb+srv://${process.env.DB_USER}: ${process.env.DB_PASS}@cluster0.zrqkd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
    try {
        
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Hello Nurnaz Travelo DB");
})

app.listen(port, () => {
    console.log(`NurNaz Travelo Server Running Port ${port}`);
})