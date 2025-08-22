const express = require('express');
const serverConfig = require('./config/server.config');
const {quit} = require('./config/redis'); 
const router = require('./routers/index');

const app = express();

app.use(express.json());

app.use('/',router)


const PORT = serverConfig.PORT;
app.listen(PORT, ()=>{
    console.log(`Server 🚀 on ${PORT}`);
})

process.on('SIGINT' , async () =>{   //Signal Interrupt
    console.log(' Shutting down server ... ');
    await quit();
    process.exit(0);
});


