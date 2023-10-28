
const mongoose=require('mongoose')

const messageModal=mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String,
        trim:true
    },
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isDeleted:{
        type:Boolean,
        

    },
    deletedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
},{
    timestamps:true
})

const message=mongoose.model('Message',messageModal)

module.exports=message