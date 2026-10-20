import jwt from 'jsonwebtoken';
export function auth(req,res,next){const token=req.headers.authorization?.replace(/^Bearer /i,'');if(!token)return res.status(401).json({error:'Authentication required'});try{const value=jwt.verify(token,process.env.JWT_SECRET);req.userId=value.sub;next();}catch{return res.status(401).json({error:'Invalid or expired session'});}}
