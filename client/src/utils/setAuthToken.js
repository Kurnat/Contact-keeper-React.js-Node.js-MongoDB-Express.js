import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    console.log('delete token from utils');
    delete axios.defaults.headers.common['x-auth-token']
  }
}

export default setAuthToken;