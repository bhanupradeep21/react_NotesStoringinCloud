const mongoose = require('mongoose');

const mongoUri = "your mongo uri";
const connectToMongo = ()=>{
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
        .then(()=>{
            console.log("connected to mongodb successfully")
        })
        .catch((err)=>{
            console.log("Error Occured",err)
        })
 }

module.exports=connectToMongo;