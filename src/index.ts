import express from "express";
import "dotenv/config";
import "./db/mongoose";
import userRouter from "./routers/user";
import taskRouter from "./routers/task";

const app: express.Express = express();
const port: number = parseInt(process.env.PORT as any) || 3000;

app.use(userRouter);
app.use(taskRouter);

app.get("/", async (req, res) => {
  res.end("welcome welcome!");
});

app.listen(port, () => {
  console.log("server is up! PORT: ", port);
});
