import React, { useEffect } from 'react';
import { useState, useReducer } from 'react';
import axios from 'axios';

import Modal from './modal.js';
import { 
  reducer,
  defaultState,
  loadRoutes,
  RouteProvider,

 } from '../store.js';

const AddRoute = () => {
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);
  

  useEffect(() => {
    loadRoutes(dispatch);
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) { 
      const newRoute = { name, trip_id: 1 };
      dispatch({type: 'ADD_ROUTE', payload: newRoute})
      setName('');
    } else {
      dispatch({type: 'NO_VALUE'});
    }
  };

  const closeModal = () => {
    dispatch({type: 'CLOSE_MODAL'});
  };

  return (
    <>
    <RouteProvider>
    {state.isModalOpen && (
      <Modal closeModal={closeModal} modalContent={state.modalContent} />
    )}
    <form onSubmit={handleSubmit} className='add-route-form'>
      <div>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <button type='submit'>ADD</button>
    </form>
    {state.routes.map((route) => {
      console.log(state.routes);
      return (
        <div key={route.id} className='route'>
          <h4>{route.name}</h4>
          <button className="add-route-remove-btn" onClick={() => dispatch({type: 'REMOVE_ITEM', payload: route.id})}>REMOVE</button>
        </div>
      )
    })}
    </RouteProvider>
    </>
  )
}

export default AddRoute;