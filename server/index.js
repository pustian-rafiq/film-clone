const express = require('express')

const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

// app.listen(8800,(req,res)=> {
//     console.log("Backend server is running on port 8800")
// })




// Create server 
const PORT = process.env.PORT || 8800
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(()=> {
    console.log("Database Created")
    app.listen(PORT,()=> {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch(err => {
    console.log(err)
})