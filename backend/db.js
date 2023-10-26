const mongoose = require('mongoose');

const mongoUri = "mongodb+srv://user:8247717764@cluster0.iqqwu9y.mongodb.net/iNotebook";
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