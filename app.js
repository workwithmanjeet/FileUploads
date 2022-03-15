if (process.env.NODE_ENV!== "production"){
    require('dotenv').config({ path:'./.env' });
}

const express= require("express")
const app =express()
const path = require('path');
const ejsmate = require('ejs-mate');
app.use(express.static( path.join(__dirname,'public')))
app.engine('ejs',ejsmate)

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'))



const url = process.env.Dburl

const mongoose = require('mongoose');
mongoose.connect(url,{
   
});


const uploadRoutes =require('./routes/upload')
const  downloadRoutes =require('./routes/download')

const db = mongoose.connection;
db.on('error',console.error.bind(console,'Connection Error'));
db.once('open',() =>{
    console.log("Database Connected");
})

app.get('/',(req, res)=>{
    res.render('home.ejs')
})


app.use('/',uploadRoutes )
app.use('/',downloadRoutes )



app.all('*', (req, res, next) => {
    res.status(404).send('Page Not Found') 
})


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('on port 3000')
})