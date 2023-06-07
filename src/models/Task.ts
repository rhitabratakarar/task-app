import { Schema, model } from "mongoose";

interface ITask {
  description: string;
  completed?: boolean;
}

const taskSchema = new Schema<ITask>({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Task = model<ITask>("Task", taskSchema);
export default Task;
