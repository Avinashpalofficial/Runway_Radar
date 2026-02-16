import { RequestHandler } from "express";

export const catchAsyncError  = 
(fn:RequestHandler):RequestHandler => (req,res,next)=>{
     Promise.resolve(fn(req,res,next)).catch(next)
}
      
                    