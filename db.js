const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/SabHai"

const connectToMongo = async () =>{
    try{
        mongoose.set("strictQuery", false)
        mongoose.connect(mongoURI)
        console.log("Connected to Mongo Succesfully !!")
    }
    catch(error){
        console.log(error);
        
    }
}

module.exports = connectToMongo;
