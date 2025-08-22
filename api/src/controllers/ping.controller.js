const pingHandler = (req,res)=>{

     return res.status(200).json({
        success:true,
        message:"Pong"
     })
}

module.exports = pingHandler;