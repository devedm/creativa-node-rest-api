const express = require('express');
const app = express();

const routers = require('./router');

//middlewares
app.use(routers);

app.listen(3000, ()=>{
    console.log('app runnning in port 3000')
})