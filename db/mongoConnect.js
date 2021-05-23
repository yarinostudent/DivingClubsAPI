// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://YarinoAdmin:Y0a0r0i0n@divingcluster.uf6r2.mongodb.net/diving_club?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('Mongo Connected');
});


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://YarinoAdmin:<password>@divingcluster.uf6r2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('Mongo Connected');
//   client.close();
// });
