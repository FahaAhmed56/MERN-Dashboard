import {Router} from 'express';
import bcrypt from 'bcryptjs';import jwt from 'jsonwebtoken';import {z} from 'zod';import User from '../models/User.js';
const router=Router();const credentials=z.object({email:z.string().email().max(200),password:z.string().min(8).max(128)});
const issue=user=>jwt.sign({sub:String(user._id)},process.env.JWT_SECRET,{expiresIn:'7d'});
router.post('/register',async(req,res,next)=>{try{const data=credentials.extend({name:z.string().min(2).max(80)}).parse(req.body);if(await User.exists({email:data.email.toLowerCase()}))return res.status(409).json({error:'Email already registered'});const user=await User.create({name:data.name,email:data.email.toLowerCase(),passwordHash:await bcrypt.hash(data.password,12)});res.status(201).json({token:issue(user),user:{id:user.id,name:user.name,email:user.email}});}catch(e){if(e.code===11000)return res.status(409).json({error:'Email already registered'});next(e);}});
router.post('/login',async(req,res,next)=>{try{const data=credentials.parse(req.body);const user=await User.findOne({email:data.email.toLowerCase()});if(!user||!(await bcrypt.compare(data.password,user.passwordHash)))return res.status(401).json({error:'Invalid email or password'});res.json({token:issue(user),user:{id:user.id,name:user.name,email:user.email}});}catch(e){next(e);}});
export default router;
