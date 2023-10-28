const { default: mongoose } = require("mongoose");

const chatModal = mongoose.Schema({

    isGroupChat: {
        type: Boolean,
        default: false
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    latestMessage: {
        type:String,
        default:null

    },
    lastMsgDate: {
        type: Date,
        default: Date.now
    },
    lastMsgBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    unreadCount: {
        type: Number
    }
},
    {
        timestamps: true
    })

const Chat = mongoose.model("Chat", chatModal)

module.exports = Chat