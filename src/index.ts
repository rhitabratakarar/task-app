import express from "express";
import "dotenv/config";
import "./db/mongoose";
import User from "./models/User";

const app: express.Express = express();
const port: number = parseInt(process.env.PORT as any) || 3000;
app.use(express.json());

app.get("/", async (req, res) => {
  res.end("welcome welcome!");
});

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

app.listen(port, () => {
  console.log("server is up! PORT: ", port);
});
