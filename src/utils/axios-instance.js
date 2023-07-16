import axios from 'axios'
import Utils from "../utils";
import {API_BASE_URL} from "../constants/ApiConstant"; // function Logout in redux action




let TOKEN = null;
if (localStorage.getItem("token")) {
    try {
        let NewToken = localStorage.getItem('token')
        if (typeof (NewToken) !== "undefined") {
            TOKEN = NewToken
        }
    } catch (err) {
        TOKEN = ""
    }
}

let headers = {
    "Authorization": Utils.getToken() ?? TOKEN
}


const AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_MASTER || window.origin,
    headers: {
        ...headers,
    },
})

AxiosInstance.isCancel = axios.isCancel;

AxiosInstance.interceptors.response.use(
    (res) =>
        new Promise((resolve, reject) => {
            if (res.data.error === 'Unauthorized') {
            } else {
                resolve(res)
            }
        }),

    (err) => {
        if (!err.response) {
            return new Promise((resolve, reject) => {
                reject({...err})
            })
        }
        if (err.response.status === 401) {
            return new Promise((resolve, reject) => {
                reject(err)
            })
            // store.dispatch(signOut())
        } else {
            return new Promise((resolve, reject) => {
                reject({...err?.response?.data})
            })
        }
    }
)

export default AxiosInstance;
