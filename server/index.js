const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

//Import routes
const authRoutes = require('./routes/authRoute')
const userRoutes = require('./routes/userRoute')



// Create server 
const PORT = process.env.PORT || 8800
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(()=> {
    console.log("Database Created")
    // app.listen(PORT,()=> {
    //     console.log(`Server is running on port ${PORT}`)
    // })
}).catch(err => {
    console.log(err)
})

app.use(express.json())
//Call routes
app.use('/server/auth', authRoutes)
app.use('/server/users', userRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'Hello world'
    })
})

app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`)
})