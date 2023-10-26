const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const port = 5000 || process.env.PORT
connectToMongo()


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.get('/',(req, res) => {
    res.send('hello')
})

app.listen(port,()=>{
    console.log("iNotebook backend listening on port 5000");
})

