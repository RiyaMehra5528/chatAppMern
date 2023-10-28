const { default: mongoose } = require("mongoose");


const userModal=mongoose.Schema({

    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }, 
    socketId:{
        type:String,
        default:null
    },
    picture:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fprofile_6915987&psig=AOvVaw37INv_i5lvP8TGnDBut4nc&ust=1698385946762000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNCz--qCk4IDFQAAAAAdAAAAABAE"
    },
    isActive:{
        type:Boolean,
        
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const User=mongoose.model('User',userModal)

module.exports=User