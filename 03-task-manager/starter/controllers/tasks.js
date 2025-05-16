
const Task = require('../models/task.js');
const getAllTasks = async (req, res) => {
    try {
      const allTasks = await Task.find({});
      return res.status(200).json({success:true,data:{tasks,nbHits:tasks.length}});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };
  const createTask = async (req, res) => {
    try {
      const task = await Task.create(req.body);
      return res.status(201).json({ task });
    } catch (err) {
      return res.status(500).json({ msg: err.message || "Server Error creating task" });
    }
  };
  
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `Task not found with ID: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ msg: `Invalid ID format: ${req.params.id}` });
    }
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
};

const updateTask = async (req, res) => {
  try{
    const {id:taskID} = req.params;
    const task = await Task.findOneAndUpdate({_id:taskID},req.body,{new:true,runValidators:true})

    if(!task){
      return res.status(404).json({msg:`No task with id: ${taskID}`})
    }
    res.status(200).json({task})
  }catch(err){
    res.status(500).json({msg:err})
  }
    
}
const deleteTask = async (req, res) => {
    try{
        const { id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return res.status(500).json({msg:"No task with id"})

        }
        res.status(200).json({task:null,status:"success"})

        res.status(200).json(task)
    }catch(err){
        res.status(500).json({msg:err})
    }

}
const deleteAllTasks = async (req, res) => {
  try {
    const deleteResult = await Task.deleteMany({});
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ msg: "No tasks to delete" });
    }
    res.status(200).json({ msg: `${deleteResult.deletedCount} tasks deleted` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


module.exports = {
    getAllTasks,createTask,getTask,updateTask,deleteTask,deleteAllTasks
}