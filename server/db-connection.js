const mongoose = require("mongoose");

async function connectMongoDB(url){
   return mongoose.connect(url,{useNewUrlParser:true},{useUnifiedTopology:true}).then(()=>{
      console.log("mongodb atlas connection sucsessfull")
   }).catch((err)=>{
      console.log("mongodb atlas connection faild", err)
   })
}

module.exports = connectMongoDB;