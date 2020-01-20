import Axios from 'axios'

const api = Axios.create({
    baseURL: 'http:192.168.9.15:3333/'
})

export default api 
