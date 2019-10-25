require('dotenv').config();
const mongoose = require('mongoose');
console.log(process.env.MONGO_DBURI);
mongoose.connect(process.env.MONGO_DBURI, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true });
mongoose.connection.on('connected', function(){
    console.log('Mogodb connected');
})

mongoose.connection.on('error', function(error){
    console.log('Mogodb Connection Error', error);
})
mongoose.connection.on('disconnected', function(){
    console.log('Mogodb disconnected');
})
process.on('SIGINT', function(){
    console.log('closed')
    mongoose.connection.close(function(){
        console.log(termination("Mongoose default connection is disconnected due to application termination"));
        process.exit(0)
    });
});

// module.exports;