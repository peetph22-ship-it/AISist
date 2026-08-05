const pool = require("../config/db")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'aisist_secret_jwt_key_2026'

// login Student
const loginStudent = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const loginIdentifier = email || username

        if (!loginIdentifier || !password) {
            return res.status(400).json({ success: false, message: 'กรุณากรอกอีเมล/ชื่อผู้ใช้ และรหัสผ่าน' })
        }

        const sql = `SELECT * FROM tb_student WHERE email = $1 OR username = $1`
        const { rows } = await pool.query(sql, [loginIdentifier.trim()])

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'อีเมล/ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง' })
        }

        const user = rows[0]
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'อีเมล/ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง' })
        }

        delete user.password

        // Generate JWT Token (1-day expiration)
        const token = jwt.sign(
            { id: user.id_student || user.id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.status(200).json({
            message: 'เข้าสู่ระบบสำเร็จ',
            success: true,
            token,
            user,
        })
    } catch (err) {
        console.error("Error Login!", err)
        res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์ ไม่สามารถเข้าสู่ระบบได้' })
    }
}

// logout Student (Kill Token)
const logoutStudent = async (req, res) => {
    res.status(200).json({
        message: 'ออกจากระบบและยกเลิก Token เรียบร้อยแล้ว',
        success: true,
    })
}

module.exports = { loginStudent, logoutStudent }
