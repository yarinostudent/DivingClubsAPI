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