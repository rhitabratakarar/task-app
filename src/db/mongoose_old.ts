// import {Schema, model, connect} from 'mongoose';
// import isEmail from 'validator/lib/isEmail';

// async function main() {
//     const aUser = new User<IUser>({
//         name: 'ehe',
//         email: 'bruhbruhbruh@gmail.com',
//         age: 12,
//         password: 'password1'
//     });
//     await connect('mongodb+srv://Submerge3151:XgvrR5SxaR@cluster0.jgmwtb6.mongodb.net/task-manager-api');
//     aUser.save();
//     console.log('saved!');
// }

// main().catch(error => console.log(error));

// interface ITask {
//   description: string;
//   completed?: boolean;
// }

// const taskSchema = new Schema<ITask>({
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   completed: {
//     type: Boolean,
//     required: false,
//     default: false,
//   },
// });

// const Task = model<ITask>("Task", taskSchema);

// async function execute() {
//   const aTask = new Task<ITask>({
//     description: "    this is a task     ",
//   });

//   await connect(
//     "mongodb+srv://Submerge3151:XgvrR5SxaR@cluster0.jgmwtb6.mongodb.net/task-manager-api"
//   );
//   await aTask.save();
//   console.log("saved");
// }

// execute().catch((error) => {
//   console.log(error);
// });
