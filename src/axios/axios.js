import axios from 'axios'

export default axios.create({
    baseURL: 'https://tech-sup-default-rtdb.firebaseio.com'
})