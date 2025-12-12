const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true,
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
        },
        dueDate:{
            type:Date,
        },
        priority:{
            type:String,
            enum:["High", "Medium", "Low"],
            default:"Other",
        },
        category: {
            type: String,
            enum: ["Work", "Personal", "Study", "Other"],
            default: "Other"
        },
        isCompleted:{
            type:Boolean,
            default:false,
        },
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Task",taskSchema)