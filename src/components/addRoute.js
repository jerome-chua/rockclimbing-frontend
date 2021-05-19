import React, { useContext, useEffect, useState  } from 'react';
import Modal from './modal.js';
import AddDifficulty from './AddDifficulty.jsx';
import { 
  loadRoutes,
  addNewRoute,
  difficulty,
  TripContext,
 } from '../store.js';


const AddRoute = () => {
  const [name, setName] = useState('');
  const {store, dispatch} = useContext(TripContext);
  const {isModalOpen, modalContent, routes} = store;

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
    {isModalOpen && (
      <Modal closeModal={closeModal} modalContent={modalContent} />
    )}

    <form onSubmit={handleSubmit} className='add-route-form'>
      <div className='add-route-input-div'>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <button type='submit'>ADD</button>
    </form>

    {routes.map((route, index) => {
      return (
        <div key={route.id} className='route'>
          <h4>{route.name}</h4>
          {route.difficulty 
          ? <h4>{route.difficulty}</h4> 
          :<>
           <AddDifficulty dispatch={dispatch} difficulty={difficulty} id={index} routeId={route.id}/>
           </>}
          <button className="add-route-remove-btn px-3" onClick={() => dispatch({type: 'REMOVE_ROUTE', payload: route.id})}>REMOVE</button>
        </div>
      )
    })}
    </>
  )
}

export default AddRoute;