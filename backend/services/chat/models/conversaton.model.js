import mongoose from "mongoose";

const conversationSchema=new mongoose.Schema({
    title:{
        type:String,
        default:"New Chat"
    },
    userId:{
        type:String
    }
},
{timestamps:true
}
)
const conversation=mongoose.model("conversation",conversationSchema)
export default Message