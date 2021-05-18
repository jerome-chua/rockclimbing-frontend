import React, { useEffect } from 'react';
import { useState, useReducer } from 'react';
import axios from 'axios';

import Modal from './modal.js';
import { 
  reducer,
  defaultState,
  loadRoutes,
  addNewRoute,
  RouteProvider,
  difficulty,

 } from '../store.js';
import AddDifficulty from './addDifficulty.js';

const AddRoute = () => {
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);
  

  useEffect(() => {
    loadRoutes(dispatch);
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) { 
      const newRoute = { name, tripId: 1 };
      dispatch({type: 'ADD_ROUTE', payload: newRoute})
      addNewRoute(dispatch, name);
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
    <h2 className='routes-header'>Routes</h2>
    <form onSubmit={handleSubmit} className='add-route-form'>
      <div className='add-route-input-div'>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <button type='submit'>ADD</button>
    </form>
    {state.routes.map((route, index) => {
      console.log(state.routes);
      return (
        <div key={route.id} className='route'>
          <h4>{route.name}</h4>
          {route.difficulty ? <h4>{route.difficulty}</h4> :
          <>
          <AddDifficulty dispatch={dispatch} difficulty={difficulty} id={index} routeId={route.id}/>
          </>}
          <button className="add-route-remove-btn" onClick={() => dispatch({type: 'REMOVE_ROUTE', payload: route.id})}>REMOVE</button>
          
        </div>
      )
    })}
    </RouteProvider>
    </>
  )
}

export default AddRoute;