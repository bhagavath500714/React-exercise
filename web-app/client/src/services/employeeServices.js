import { API_URL } from '../constant/constants';
import axios from 'axios'


export const getDepartmentCollection = () => ([
    {id: '1', title: "Development"},
    {id: '2', title: "Marketing"},
    {id: '3', title: "Accounting"},
    {id: '4', title: "HR"}
])

export const getToken = () => {
    const token = window.sessionStorage.getItem("token");
    const tokenText = 'Bearer ';
    const tokenData = tokenText + token;
    return tokenData;
 }

//Register
export const userRegisteration = async (data) => {
    return axios.post(API_URL + "/register", data, { headers: {Authorization: getToken() }})
}

//login
export const userLogin = async (data) => {
    return axios.post(API_URL + "/login", data, { headers: {Authorization: getToken() }})
}

//get user
export const getAllUsers = ()=>{
    return axios.get(API_URL + "/", { headers: {Authorization: getToken() }})
}

//update user
export const updateUsers = async (data) =>{
    return axios.patch(API_URL + "/", data, { headers: {Authorization: getToken() }})
}

//delete user
export const deleteUsers = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: {Authorization: getToken() }})
}