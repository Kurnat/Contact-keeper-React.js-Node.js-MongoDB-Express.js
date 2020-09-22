import React, { useReducer } from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import AuthContext from './authContext';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
// USER_LOADED,
// AUTH_ERROR,
// LOGIN_SUCCESS,
// LOGIN_FAIL,
// LOGOUT,
// CLEAR_ERRORS,
} from '../types';

const AuthState = props => {
  const initialState = {
   token: localStorage.getItem('token'),
   isAuthenticated: null,
   loading: true,
   user: true,
   error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  
  // Load User
  const loadUser = async () => {
    // @todo - load token into global headers
    if(localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');
      dispatch({type: USER_LOADED, payload: res.data});

    } catch (error) {
      if (error.response) {
        // Request made and server responded
        dispatch({
          type: REGISTER_FAIL,
          payload: error.response.data.msg
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }

      dispatch({type: AUTH_ERROR});
      
    }
  };

  // Register User, work with
  const register = async formData => {
    console.log('register');
    try {
      const config = { headers: { 'Content-Type': 'application/json' }};
      const res = await axios.post('/api/users', formData, config);

      console.log(res);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();

    } catch (error) {
      if (error.response) {
        // Request made and server responded
        dispatch({
          type: REGISTER_FAIL,
          payload: error.response.data.msg
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  }

  // Login User
  const login = async formData => {
    console.log('register');
    try {
      const config = { headers: { 'Content-Type': 'application/json' }};
      const res = await axios.post('/api/auth', formData, config);

      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();

    } catch (error) {
      if (error.response) {
        // Request made and server responded
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response.data.msg
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  }


  // Logout
  const logout = () => dispatch({type: LOGOUT});


  // Clear Errors
  const clearErrors = () => dispatch({type:CLEAR_ERRORS});

  return (
    <AuthContext.Provider value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;