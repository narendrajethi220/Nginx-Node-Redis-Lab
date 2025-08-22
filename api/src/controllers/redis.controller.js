const {redis,ping} = require('../config/redis');

const healthCheckHanler = async(req,res)=>{
    try{
       const pong = await ping();
       return res.status(200).json({
        success:true,
        pong
       })
    }
    catch(err){
        return res.status(503).json({
            success:false, 
            error:'redis unavailable'
        })
    }};

const setCacheHandler = async(req,res)=>{
    try{
        const {key, value, ttl}= req.query;
    
        if(!key || typeof value === 'undefined') {
            return res.status(400).json({
                success:false,
                message:"Missing key or val"
            })
        }
        if(ttl) await redis.set(key,value, 'Ex',Number(ttl));
        else await redis.set(key, value);
        return res.status(201).json({
            success:true,
            message:'OK'
        }) 
    }
    catch(err){
        console.log('Error setting value in Redis:', err);
        return res.status(500).json({
            success:false,
            message:"Internal Redis Error",
        })
    }
}

const getCacheHandler = async(req,res)=>{
    try{
          const {key} = req.query;
          if(!key) return res.status(400).json({
            success:false, 
            message:"Missing key"
          })
          const value = await redis.get(key);
          if(value === null) return res.status(404).json({ success: false, message: 'No such key' });
        
          return res.status(200).json({
            success:true,
            result:value
          })
        }
    catch(err){
        console.log('Error getting value in Redis:', err);
        return res.status(500).json({
            success:false,
            message:"Internal Redis Error",
        })
    }
}

module.exports = {healthCheckHanler, setCacheHandler,getCacheHandler};