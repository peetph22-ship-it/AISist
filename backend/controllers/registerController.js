const pool = require("../config/db")
const bcrypt = require('bcrypt')

// register Student : change router.post => function
const registerStudent = async (req,res) => {
    try {
        // Input: student Data
        const { name, last_name, date_of_birth, school, username, password, email } = req.body

        // chk data:
        if (!username || !password || !name || !last_name || !date_of_birth) {
            return res.status(400).json({ success: false, message: 'Error Data Input!' })
        }

        // Hash Password
        const numHash = 10
        const hashPassword = await bcrypt.hash(password, numHash)

        const sql = `insert into tb_student (name,last_name,date_of_birth,school,username,password,email) values ($1,$2,$3,$4,$5,$6,$7)`
        const value = [name, last_name, date_of_birth, school, username, hashPassword, email]
        const { rows } = await pool.query(sql,value)

        res.status(201).json({
            message:'Register success !',
            success: true,
        })

        // const [rows] = await db.query(`insert into tb_student (name,last_name,date_of_birth,school,username,password) values (?,?,?,?,?,?)`, [name, last_name, date_of_birth, school, username, hash])

// register Mentor
const registerMentor = async (req, res) => {
    try {
        const { name, last_name, date_of_birth, degree_level, username, password, email } = req.body

        if (!username || !password || !name || !last_name || !date_of_birth || !degree_level) {
            return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลในช่องที่จำเป็นให้ครบถ้วน!' })
        }

        const numHash = 10
        const hashPassword = await bcrypt.hash(password, numHash)

        const sql = `insert into tb_mentor (name, last_name, date_of_birth, degree_level, username, password, email) values ($1, $2, $3, $4, $5, $6, $7)`
        const value = [name, last_name, date_of_birth, degree_level, username, hashPassword, email]
        await pool.query(sql, value)

        res.status(201).json({
            message: 'สมัครสมาชิก Mentor สำเร็จ!',
            success: true,
        })
    } catch (err) {
        console.error("Error Register Mentor!", err)
        res.status(500).json({ message: 'เกิดข้อผิดพลาด ไม่สามารถสมัครสมาชิก Mentor ได้' })
    }
}

module.exports = { registerStudent, registerMentor }