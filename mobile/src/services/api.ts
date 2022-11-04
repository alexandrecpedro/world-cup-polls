import axios from "axios";

export const api = axios.create({
    // For Android
    baseURL: 'http://192.168.0.243:3333'
    // baseURL: 'http://localhost:3333'
});