const pool = require("../config/db")
const bcrypt = require('bcrypt')

// register Student : change router.post => function
const registerStudent = async (req,res) => {
    try {
        // Input: student Data
        const { name, last_name, date_of_birth, school, username, password } = req.body

        // chk data:
        if (!username || !password || !name || !last_name || !date_of_birth) {
            return res.status(400).json({ success: false, message: 'Error Data Input!' })
        }

        // Hash Password
        const numHash = 10
        const hashPassword = await bcrypt.hash(password, numHash)

        const sql = `insert into tb_student (name,last_name,date_of_birth,school,username,password) values ($1,$2,$3,$4,$5,$6)`
        const value = [name, last_name, date_of_birth, school, username, hashPassword]
        const { rows } = await pool.query(sql,value)

        res.status(201).json({
            message:'Register success !',
            success: true,
        })

        // const [rows] = await db.query(`insert into tb_student (name,last_name,date_of_birth,school,username,password) values (?,?,?,?,?,?)`, [name, last_name, date_of_birth, school, username, hash])

    }catch(err){
        console.error("Error Register !",err)
        res.status(500).json({message:'Error , Register !'})
    }
}

module.exports = {registerStudent}