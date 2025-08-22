const currentTimeHandler=(req,res)=>{
    const currentTime = new Date();
    return res.status(200).json({
        success:true,
        message: currentTime.toISOString()
    })
}
module.exports = currentTimeHandler;