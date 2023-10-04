import axios from 'axios';

let url = 'http://15.228.47.76:8080';


export const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": 'application/json',
    }
});
