
const Task = require('../models/task.js');
const asyncWrapper = require('../middleware/async.js')
const getAllTasks = async (req, res) => {
      const tasks = await Task.find({});
      return res.status(200).json({tasks});
  };
const createTask = asyncWrapper(async (req, res) => {
    
      const task = await Task.create(req.body);
      return res.status(201).json({ task });
  });
  
const getTask = asyncWrapper(async (req, res) => {
  
    const { id: taskID } = req.params;

    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `Task not found with ID: ${taskID}` });
    }

    res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {

    const {id:taskID} = req.params;
    const task = await Task.findOneAndUpdate({_id:taskID},req.body,{new:true,runValidators:true})

    if(!task){
      return res.status(404).json({msg:`No task with id: ${taskID}`})
    }
    res.status(200).json({task})
    
});
const deleteTask = asyncWrapper(async (req, res) => {
 
        const { id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return res.status(500).json({msg:"No task with id"})

        }
        res.status(200).json(task)

});
const deleteAllTasks = asyncWrapper(async (req, res) => {

    const deleteResult = await Task.deleteMany({});
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ msg: "No tasks to delete" });
    }
    res.status(200).json({ msg: `${deleteResult.deletedCount} tasks deleted` });
});


module.exports = {
    getAllTasks,createTask,getTask,updateTask,deleteTask,deleteAllTasks
}