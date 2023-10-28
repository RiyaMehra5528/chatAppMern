const {  mongoose } = require("mongoose");
const dotenv=require('dotenv')
dotenv.config()

const uri=process.env.MONGO_URI
console.log(uri)
mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);