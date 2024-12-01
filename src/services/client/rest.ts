import axios from 'axios';
// import Config from 'react-native-config';

// const API_BASE_URL = Config.BASE_URL;

const restClient = axios.create({
  baseURL: 'https://api.themoviedb.org/',
  params: {
    api_key: '658f8271bc0317fa1bad89d08ea115ac',
  },
  headers: {
    // 'Content-Type': 'application/json',
    // Accept: 'application/json',
  },
});

export default restClient;
