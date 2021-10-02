import { API_URL } from './constants';
import axios from 'axios'

export const getToken = () => {
    return window.sessionStorage.getItem("token")
 }

//login
export const userLogin = async (data) => {
    return axios.post(API_URL + "/login", data, { headers: {Authorization: getToken() }})
}

//Register
export const userRegisteration = async (data) => {
    return axios.post(API_URL + "/register", data, { headers: {Authorization: getToken() }})
}