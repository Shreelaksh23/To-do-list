const express=require("express");
const {createTask,getTasks,updateTask,deleteTask,markCompleted,getSingleTask}=require("../controllers/taskController")
const authMiddleware=require("../middleware/authMiddleware")

const router=express.Router();

// Protected routes
router.post("/create",authMiddleware,createTask);
router.get("/:id", authMiddleware, getSingleTask);
router.get("/all",authMiddleware,getTasks);
router.put("/update/:id", authMiddleware, updateTask);
router.delete("/delete/:id", authMiddleware, deleteTask);
router.patch("/complete/:id", authMiddleware, markCompleted);

module.exports=router;