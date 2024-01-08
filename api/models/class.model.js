import mongoose from "mongoose";
import User from "../models/user.model.js";
const classSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course'}],
    className: 'String',
  });
  
  const Class = mongoose.model('class', classSchema);

export default Class;