import React, { useReducer } from 'react';
import * as uuid from 'uuid';
import contactReducer from './contactReducer';
import ContactContext from './contactContext';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  CLEAR_CURRENT,
  UPDATE_COUNT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_CURRENT
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Tom Smith',
        email: 'tom@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Neo',
        email: 'neo@gmail.com',
        phone: '222-222-2222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Static-x',
        email: 'static@gmail.com',
        phone: '333-333-3333',
        type: 'professional'
      }
    ],
    current: null,
    filtered: null 
  }

  const [state, dispatch] = useReducer(contactReducer, initialState);
  
  // Add Contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({type: ADD_CONTACT, payload: contact});
  }

  // Delete Contact
  const deleteContact = id => {
    dispatch({type: DELETE_CONTACT, payload: id});
  }

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({type: SET_CURRENT, payload: contact});
  }

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({type: CLEAR_CURRENT});
  }

  // Update Contact
  const updateContact = contact => {
    dispatch({type: UPDATE_COUNT, payload: contact});
  }

  // Filter Contacts
  const filterContacts = text => {
    dispatch({type: FILTER_CONTACTS, payload: text});
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({type: CLEAR_FILTER});
  }

  return (
    <ContactContext.Provider value={{
      contacts: state.contacts,
      current: state.current,
      filtered: state.filtered,
      addContact,
      deleteContact,
      clearCurrent,
      setCurrent,
      updateContact,
      filterContacts,
      clearFilter
    }}>
        {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState;