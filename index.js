const express = require('express')
const bodyPaser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const app = express()


const password="alaminIT12";


app.use(bodyPaser.json());
app.use(cors());


const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://emaWatsonUser:alaminIT12@cluster0.4zce5.mongodb.net/emaWatSon?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology:true });

client.connect(err => {
  const collection = client.db("emaWatSon").collection("products");
  const ordersCollection = client.db("emaWatSon").collection("orders");
  

  app.post('/addProduct', (req,res) => {
      const product = req.body;
      console.log(product);
      collection.insertOne(product)
      .then(result => {
          console.log(result.insertedCount);
          res.send(result.insertedCount)
      })
      .catch(err => console.log(err))
  })

app.get('/products', (req,res) => {
    collection.find({})
    .toArray((err,documents) => {
        res.send(documents);
    })
})

app.get('/product/:key', (req,res) => {
    collection.find({key: req.params.key})
    .toArray((err,documents) => {
        res.send(documents[0]);
    })
})

app.post('/productsByKeys', (req,res) => {
    const productKeys = req.body;
    collection.find({key: {$in:productKeys}})
    .toArray((err, documents) => {
        res.send(documents);
    })
})

app.post('/addOrder', (req,res) => {
    const order = req.body;
    console.log(order);
    ordersCollection.insertOne(order)
    .then(result => {
        res.send(result.insertedCount >0)
    })
    .catch(err => console.log(err))
})

console.log('Database Connected');
});



app.get('/', (req, res) => {
    res.send("hello, programmers");
})

app.listen(8000, () => {
    console.log("Listenig is works");
})