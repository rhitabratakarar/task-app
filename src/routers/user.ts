import express, { Router } from "express";
import User from "../models/User";
const userRouter = Router();

userRouter.use(express.json());

userRouter.post("/users", async (req, res) => {
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

userRouter.get("/users", async (req, res) => {
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

userRouter.get("/users/:id", async (req, res) => {
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

userRouter.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).end(JSON.stringify({ message: "success" }));
  } catch (error) {
    res.status(404).end(JSON.stringify(error));
  }
});

userRouter.patch("/users/:id", async (req, res) => {
  try {
    // ! is the not null assertion operator
    const user = await User.findById(req.params.id);
    user!.name = req.body.name;
    user!.password = req.body.password;
    user!.email = req.body.email;
    await user!.save();

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

export default userRouter;
