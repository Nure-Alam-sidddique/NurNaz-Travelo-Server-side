const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient } = require("mongodb");
const cors = require('cors');
require("dotenv").config();
const ObjectId = require('mongodb').ObjectId;

// Middlewire
app.use(cors());
app.use(express.json());
//  Network URI
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zrqkd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
    try {
        await client.connect();
        const database = client.db('PlaceDestination');
        const placeCollection = database.collection('Places');

        // GET API
        app.get('/services', async (req, res) => {
            const cursor = placeCollection.find({});
            const result = await cursor.toArray();
            res.json(result);
        })

        //  Post API
        app.post('/services', async (req, res) => {
            const placeInfo = req.body;
            const result = await placeCollection.insertOne(placeInfo);
            res.json(result);
        })

        // Delete API
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await placeCollection.deleteOne(query);
            res.json(result);
        })
        
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello NurNaz Travelo');
})
app.get('/hello', (req, res) => {
    res.send("Welcome to NurNaz Travelo");
})

app.listen(port, () => {
    console.log(`NurNaz Travelo Server Running Port ${port}`);
})

/**
 * server side Command :
 * git add . , git commit, git push
 * git push heroku main
 *
 *
 * Client side :
 * git add . , git commit , git push
 * git run build
 *
 * firebase deploy
 */
