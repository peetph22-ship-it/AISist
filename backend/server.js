require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}))

app.use(express.json())
// ==============================================


// ===== Start Route =====

// register student
const registerStudent = require('./routes/auth')
app.use('/api/registerStudent',registerStudent)

// ===== Stop Route =====

// Check 
app.use((req,res) => res.status(404).json({message:'Invalid Route'}))

// end
app.listen(3001 , () => console.log("Server running on port 3001"))