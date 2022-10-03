const express = require('express')
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors')
// var bodyParser = require('body-parser')

const PORT = process.env.PORT || 4000;
require('dotenv').config()

const app = express();

app.use(cors({
    'origin': 'http://localhost:3000'
}))
app.use(express.json());
// app.use(bodyParser.json());

app.use(express.static(__dirname+'/Frontend/build'))

const userRout = require('./routs/products');



app.use('/products', userRout);

app.get('/images/:id', (req, res) => {
    console.log('something')
    console.log(req.params.id)
    fs.readFile(`./public/uploads/${req.params.id}`, async (err, data) => {
        if(err) throw err

        // let image = await data;
        res.send(data)
        
    })
    // res.end('Go to /products')

})
app.get('/', (req, res) => {
    const page = fs.readFileSync('./Frontend/build/index.html');
    res.end(page)
    // res.end('Go to /products')

})


//Connect to database
// mongoose.connect('mongodb://localhost:27017/products',{ useNewUrlParser: true }, () => {
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true }, (err) => {
    console.log(process.env.MONGO_URI)
    if(err) console.log(err)
    console.log('connected to DB')
})

app.listen(PORT, ()=>{
    console.log('server is running on port', PORT)
});