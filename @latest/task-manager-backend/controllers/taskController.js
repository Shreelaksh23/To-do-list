const Task=require("../models/Task");

// CREATE TASK
const createTask=async(req,res)=>{
    try {
        const {title,description,dueDate,priority,category}=req.body;

        if(!title){
            return res.status(400).json({messaage:"Title is required"});
        }
        
        const newTask=new Task({
            userId:req.userId,
            title,
            description,
            dueDate,
            priority,
            category,
        });

        await newTask.save();

        res.json({
            messaage:"Task created successfully",
            task:newTask
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

// GET ALL TASKS FOR LOGGED-IN USER
const getTasks=async(req,res)=>{
    try {
        const tasks=await Task.find({userId:req.userId}).sort({createdAt:-1})

        res.json(tasks);

    } catch (error) {
        res.status(500).json({messaage:"Server error",error})
    }
}

// UPDATE TASK
const updateTask=async(req,res)=>{
    try {
        const taskId=req.params.id;

        const updatedTask=await Task.findOneAndUpdate(
            {
                _id:taskId,userId:req.userId
            },
            req.body,
            {new:true}
        );

        if(!updatedTask){
            return res.status(404).json({messaage:"Task not found or unauthorized"});
        }
        res.json({
            messaage:"Task updated successfully",
            task:updatedTask,
        });
    } catch (error) {
        return res.status(500).json({messaage:"Server error",error})
    }
}

// DELETE TASK
const deleteTask=async(req,res)=>{
    try {
        const taskId=req.params.id;

        const deletedTask=await Task.findOneAndDelete({
            _id:taskId,userId:req.userId,
        });

        if(!deletedTask){
            return res.status(404).json({messaage:"Task not found or unauthorized"})
        }
        res.json({ message: "Task deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

// MARK TASK AS COMPLETED
const markCompleted = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.userId },
      { isCompleted: true },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.json({
      message: "Task marked as completed",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports={createTask,getTasks,updateTask,deleteTask,markCompleted,getSingleTask}
