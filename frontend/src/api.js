import axios from 'axios';

const API = axios.create({

  baseURL: 'https://breathe-esg-ingestion-platform-w4ol.onrender.com/api/',

});

export default API;