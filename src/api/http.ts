import axios from "axios";

export const http = axios.create({
    baseURL: 'https://gmerola.com.br/booksender/api'
})