// const { default: mongoose } = require("mongoose")
const Chat = require("../modal/chatModal")
import mongoose from 'mongoose'

export const getChat = async (req, res) => {
    console.log(req.query)
    let userId = req.query.userId
    userId= new mongoose.Types.ObjectId(userId)
    try {

        // const chats=Chat.find({ participants:{$in:[userId]}})

        const chats = await Chat.aggregate([
            {
                $match: {
                    participants: { $in: [userId] }
                }
            },
            {
                $lookup: {
                    from: 'Messages',
                    let: { chatId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$chatId', '$$chatId'] }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                sender: 1,
                                receiver: 1
                            }
                        },
                        {
                            $lookup: {
                                from: 'Users',
                                localField: 'sender',
                                foreignField: '_id',
                                as: 'senderInfo'
                            }
                        },
                        {
                            $lookup: {
                                from: 'Users',
                                localField: 'receiver',
                                foreignField: '_id',
                                as: 'receiverInfo'
                            }
                        }

                    ],
                    as: 'messages'
                }
            }
        ])

        console.log(chats)
        if (chats.length) {
            return res.status(200).json({ success: true, chats: chats })
        }
        return res.status(404).json({success:true,msg:"No Data"})
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ success: false })
    }
}

// export const createChat=async(id,userId)=>
// {

//     const s_id=new mongoose.Types.ObjectId(id)
//     const r_id=new mongoose.Types.ObjectId(userId)
// try{

//     const existingChat=await Chat.findOne({participants: { $in: [r_id,s_id] }})
//     if(!existingChat)
//     {
//     const chat=await Chat.create({
//         isGroupChat: false,
//             participants:[id,userId],
//             latestMessage: null,
//             lastMsgDate:null ,
//             lastMsgBy:null ,
//             groupAdmin: null,
//             unreadCount: null,
        
//     })
// }
// }
// catch(e)
// {
//     console.log(e)
// }
    

// }

export const createChat = async (data) => {
    try {
        // console.log("in create", data);
        // return;
//         const s_id =new mongoose.Types.ObjectId(id);
//         const r_id = new mongoose.Types.ObjectId(userId);
// console.log(id,userId)
        const existingChat = await Chat.findOne({ participants: { $all: [data.recId, data.id] } });

        if (!existingChat) {
            const chat = await Chat.create({
                isGroupChat: false,
                participants: [data.recId, data.id],
                latestMessage: data.message,
                lastMsgDate: null,
                lastMsgBy: null,
                groupAdmin: null,
                unreadCount: null,
            });

            return chat; 
        }

        return existingChat; 
    } catch (error) {
        console.error(error);
        throw error; 
    }
};