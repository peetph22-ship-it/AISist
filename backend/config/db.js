const { Pool } = require('pg')

// get value from .env
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

// Check connecting (Optional: start run server)
pool.connect((err, client , release) => {
    if(err){
        console.error("Error connect Database !",err.stack)
    }else{
        console.log("Connect Success!")
        release()
    }
})

module.exports = pool