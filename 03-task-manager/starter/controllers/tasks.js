const Task = require('../models/task')
const getAllTasks = (req,res) => {
    res.send('get all tasks')
}

const createtask =  async (req,res) => {
    const task = await Task.create(req.body)
    res.status(201).json(task)
}
const getTask = (req,res) => {
    res.send({id:req.params.id})
}
const UpdateTask = (req,res) => {
    res.send('update task')
}
const deleteTask = (req,res) => {
    res.send('delete task')
}
module.exports = {
    getAllTasks,createtask,getTask,UpdateTask,deleteTask
}