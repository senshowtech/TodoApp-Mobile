import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://www.api.diafragma.xyz/api/v1/',
});
