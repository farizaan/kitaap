import axios from 'axios';

const env = process.env.NODE_ENV;

const host = process.env.NEXT_PUBLIC_BASE_URL;

export const ApiInstance = axios.create({
  baseURL: host,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'ru',
  },
});
