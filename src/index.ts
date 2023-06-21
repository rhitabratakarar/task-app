import express from "express";
import "dotenv/config";
import "./db/mongoose";
import User from "./models/User";
import Task from "./models/Task";

const app: express.Express = express();
const port: number = parseInt(process.env.PORT as any) || 3000;
app.use(express.json());

app.get("/", async (req, res) => {
  res.end("welcome welcome!");
});

// --------------------------------------------------------------------------

app.post("/users", async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    await newUser.save();
    res.status(200);
    res.end(JSON.stringify({ message: "successful" }));
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
    res.setHeader("Content-Type", "application/json").status(500).end(error);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();
    if (!user)
      res
        .status(404)
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify({ message: "not found by id" }));
    else
      res
        .status(200)
        .setHeader("Content-Tpye", "application/json")
        .end(JSON.stringify(user));
  } catch (error: any) {
    console.log(error);
    if (error.name === "CastError")
      res
        .status(500)
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify({ message: "ID length mismatch." }));
    else
      res.status(500).setHeader("Content-Type", "application/json").end(error);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).end(JSON.stringify({ message: "success" }));
  } catch (error) {
    res.status(404).end(JSON.stringify(error));
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });

    if (!user) {
      res
        .status(404)
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify({ message: "no user to update" }));
    } else {
      res
        .status(200)
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify({ message: "success" }));
    }
  } catch (error) {
    res
      .status(500)
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(error));
  }
});

// -------------------------------------------------------------------------

app.get("/tasks", async (req, res) => {
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

app.get("/tasks/:id", async (req, res) => {
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

app.post("/tasks", async (req, res) => {
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

app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).end(JSON.stringify({ message: "success" }));
  } catch (error) {
    res.status(404).end(JSON.stringify(error));
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    Task.findByIdAndUpdate(req.params.id);
  } catch (error) {
    res
      .status(404)
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify({ error }));
  }
});

app.patch("/tasks/:id", async (req, res) => {
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

app.listen(port, () => {
  console.log("server is up! PORT: ", port);
});
