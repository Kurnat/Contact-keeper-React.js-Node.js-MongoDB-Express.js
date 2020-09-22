import React, { useReducer } from 'react';
import * as axios from 'axios'; 
import contactReducer from './contactReducer';
import ContactContext from './contactContext';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  UPDATE_COUNT,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CLEAR_CURRENT,
  SET_CURRENT,
  CLEAR_ERRORS,
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);
  
  // Get Contacts 
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      console.log(res);
      dispatch({
        type: GET_CONTACTS, 
        payload: res.data.contacts
      });

    } catch (err) {
      console.log(err);
      if (err && err.response) {
        dispatch({
          type: CLEAR_ERRORS,
          payload: err.response.msg
        });
      }
    }
  };

  // Add Contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/contacts', contact, config);
      console.log(res);
      dispatch({
        type: ADD_CONTACT, 
        payload: res.data
      });

    } catch (err) {
      console.log(err);
      if (err && err.response) {
        dispatch({
          type: CLEAR_ERRORS,
          payload: err.response.msg
        });
      }
    }
  };

  // Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({
        type: DELETE_CONTACT, 
        payload: id
      });
    } catch (err) {
      console.log(err);
      if (err && err.response) {
        dispatch({
          type: CLEAR_ERRORS,
          payload: err.response.msg
        });
      }
    }
  };

  // Update Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
 
      // console.log(res.data, contact);
      dispatch({
        type: UPDATE_COUNT, 
        payload: res.data
      });

    } catch (err) {
      console.log(err);
      if (err && err.response) {
        dispatch({
          type: CLEAR_ERRORS,
          payload: err.response.msg
        });
      }
    }
    
  };


  // Clear Contacts
  const clearContacts = () => dispatch({type: CLEAR_CONTACTS});

  // Set Current Contact
  const setCurrent = contact => dispatch({type: SET_CURRENT, payload: contact});

  // Clear Current Contact
  const clearCurrent = () => dispatch({type: CLEAR_CURRENT});

  // Filter Contacts
  const filterContacts = text => dispatch({type: FILTER_CONTACTS, payload: text});

  // Clear Filter
  const clearFilter = () => dispatch({type: CLEAR_FILTER});

  return (
    <ContactContext.Provider value={{
      contacts: state.contacts,
      current: state.current,
      filtered: state.filtered,
      error: state.error,
      getContacts,
      addContact,
      deleteContact,
      clearCurrent,
      setCurrent,
      updateContact,
      filterContacts,
      clearFilter,
      clearContacts

    }}>
        {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState;