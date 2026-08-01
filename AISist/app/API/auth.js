import axios from 'axios'

// test api รอเปลี่ยนแปลง
const api = `http://localhost:3001/api/auth/login`
export default {login : (data) => axios.post(`${api}`,data)}