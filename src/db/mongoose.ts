import { connect } from "mongoose";
import "dotenv/config";

connect(`${process.env.CONN}${process.env.DB_NAME}`);
