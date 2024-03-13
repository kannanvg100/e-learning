import Axios from 'axios'
const BASE_URL = '/'
const axios = Axios.create({})

module.exports = {
    loginUser: async ({ email, password, role }) => {
        return axios
            .post(`${BASE_URL}/login`, { email, password, role }, { withCredentials: true })
            .then((res) => res.data)
    },
    socialLoginUser: async ({ type, code, role }) => {
        return axios
            .post(`${BASE_URL}/social-login`, { type, code, role }, { withCredentials: true })
            .then((res) => res.data)
            .catch((err) => {
                throw err
            })
    },
    logoutUser: async (role) => {
        return axios
            .get(`${BASE_URL}/logout?role=${role}`, { withCredentials: true })
            .then((res) => res.data)
            .catch((err) => {
                throw err
            })
    },
}
