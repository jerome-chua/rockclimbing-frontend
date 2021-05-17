import React, { useReducer } from 'react';
import axios from 'axios';

// state and dispatch (for adding and removing a route)
export const defaultState = {
  routes: [],
  isModalOpen: false,
  modalContent: '',
};

export const reducer = (state, action) => {
  if (action.type === 'ADD_ROUTE') {
    const newRoutes = [...state.routes, action.payload];
    return {
      ...state,
      routes: newRoutes,
      isModalOpen: true,
      modalContent: 'route added',
    }
  }

  if (action.type === 'NO_VALUE') {
    return {
      ...state,
      isModalOpen: true,
      modalContent: 'please enter a route'
    };
  }

  if (action.type === 'CLOSE_MODAL') {
    return {
      ...state, 
      isModalOpen: false
    }
  }

  if (action.type ==='REMOVE_ROUTE') {
    const newRoutes = state.routes.filter((route) => route.id !== action.payload);
    return {
      ...state,
      routes: newRoutes
    }
  }

  if(action.type === 'LOAD_ROUTES') {
    console.log('state.routes', [...state.routes]);
    const allRoutes = [...state.routes, ...action.payload] 
    console.log(allRoutes);
    return {
      ...state,
      routes: allRoutes,
    }
  }

  throw new Error ('no matching action');
}

export const RouteContext = React.createContext(null);
export const RouteProvider = ({children}) => {
  const [store, dispatch] = useReducer(reducer, defaultState);
  return (
    <RouteContext.Provider value={{store, dispatch}}>
      {children}
    </RouteContext.Provider>
  )
}

// backend requests
const BACKEND_URL = 'http://localhost:3004';

export const loadRoutes = (dispatch) => {
  axios
      .get(BACKEND_URL + '/routes/1')
      .then((response) => {
        const routes = response.data.tripRoutes;
        console.log(routes);
        dispatch({type: 'LOAD_ROUTES', payload: routes})
      })
}

