import axios from 'axios';

const nextApi = axios.create({ baseURL: '/api' });

export { nextApi };
