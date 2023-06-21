import express, { Router } from "express";
import Task from "../models/Task";
const taskRouter = Router();

taskRouter.use(express.json());

taskRouter.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(tasks));
  } catch (error) {
    console.log(error);
    res.setHeader("Content-Type", "application/json").status(500).end(error);
  }
});

taskRouter.get("/tasks/:id", async (req, res) => {
  try {
    const particularTask: object | null = await Task.findById(req.params.id);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(particularTask));
  } catch (error) {
    res
      .status(400)
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(error));
  }
});

taskRouter.post("/tasks", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const newTask = new Task({
      description: req.body.description,
      completed: req.body.completed,
    });
    await newTask.save();
    res.status(201);
    res.end(JSON.stringify({ message: "success" }));
  } catch (error) {
    console.log(error);
    res.status(400);
    res.end(error);
  }
});

taskRouter.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).end(JSON.stringify({ message: "success" }));
  } catch (error) {
    res.status(404).end(JSON.stringify(error));
  }
});

taskRouter.put("/tasks/:id", async (req, res) => {
  try {
    Task.findByIdAndUpdate(req.params.id);
  } catch (error) {
    res
      .status(404)
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify({ error }));
  }
});

taskRouter.patch("/tasks/:id", async (req, res) => {
  // get the request params from id
  const idToUpdate = req.params.id;

  // get the body of the updating fields
  const bodyToUpdate = req.body;

  // send a request to mongodb atlas to update the field using Mongoose model
  try {
    await Task.findByIdAndUpdate(idToUpdate, bodyToUpdate, {
      new: true,
      runValidator: true,
    });
  } catch (error) {
    return res
      .status(400)
      .setHeader("content-type", "application/json")
      .end(error);
  }

  // await for the responses and update the user with proper message
  res
    .status(200)
    .setHeader("content-type", "application/json")
    .end(JSON.stringify({ message: "success" }));
});

export default taskRouter;