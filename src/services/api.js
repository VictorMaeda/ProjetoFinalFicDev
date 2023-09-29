import axios from 'axios';

let url = 'http://localhost:8080';


export const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": 'application/json',
    }
});
