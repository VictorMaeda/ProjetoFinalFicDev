import axios from 'axios';

let url = 'http://15.228.253.142:8080';


export const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": 'application/json',
    }
});
