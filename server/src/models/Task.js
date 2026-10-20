import mongoose from 'mongoose';
const schema=new mongoose.Schema({owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},project:{type:mongoose.Schema.Types.ObjectId,ref:'Project',required:true,index:true},title:{type:String,required:true,trim:true},description:{type:String,default:''},status:{type:String,enum:['todo','in_progress','done'],default:'todo'},priority:{type:String,enum:['low','medium','high'],default:'medium'},dueDate:{type:Date,default:null}},{timestamps:true});
export default mongoose.model('Task',schema);
