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
    
    const allRoutes = [...state.routes, ...action.payload] 
    console.log(allRoutes);
    return {
      ...state,
      routes: allRoutes,
    }
  }

  if (action.type === 'ADD_DIFFICULTY') {
    state.routes[action.payload.id].difficulty = action.payload.difficulty;
    return {
      ...state,
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

export const difficulty = [1, 2, 3, 4, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.11, 5.12, 5.13, 5.14, 5.15];

// backend requests
const BACKEND_URL = 'http://localhost:3004';

// get all available routes
export const loadRoutes = (dispatch) => {
  axios
      .get(BACKEND_URL + '/routes/1')
      .then((response) => {
        const routes = response.data.tripRoutes;
        console.log(routes);
        dispatch({type: 'LOAD_ROUTES', payload: routes})
      })
      .catch((error) => console.log(error));
}

// add a new route to the database
export const addNewRoute = (dispatch, name) => {
  axios
        .post(BACKEND_URL + '/addRoute', {
          name: name,
          tripId: 1})
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error))
}

// update difficulty level of routes
export const updateDifficulty = (routeId, routeDifficulty) => {
  axios
    .post(BACKEND_URL + '/addDifficulty', {
      routeId: routeId,
      difficulty: routeDifficulty
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.log(error));
}