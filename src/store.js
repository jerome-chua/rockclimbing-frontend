import axios from 'axios';
import React, { useReducer } from 'react';

// State & dispatch.
export const initialState = {
  trips: [],
  routes: [],
};

const LOAD_TRIPS = 'LOAD_TRIPS';
const LOAD_ROUTES = 'LOAD_ROUTES';

export function tripReducer(state, action) {
  switch (action.type) {
    case LOAD_TRIPS:
      return {
        ...state, 
        trips: action.payload
      }

    case LOAD_ROUTES:
      return {
        ...state, 
        routes: action.payload
      }

    default:
      return state;
  }
}

// Action creators (passed to dispatch)
export function loadTripsAction(trips) {
  return {
    type: LOAD_TRIPS,
    payload: trips,
  }
}

export function loadRoutesAction(routes) {
  return {
    type: LOAD_ROUTES,
    payload: routes,
  }
}

// Provider
export const TripContext = React.createContext(null);
const { Provider } = TripContext;

export function TripProvider({children}) {
  const [store, dispatch] = useReducer(tripReducer, initialState);
  return (
    <Provider value={{store, dispatch}}>
      {children}
    </Provider>
  )
}

// Reqyests
const BACKEND_URL = 'http://localhost:3004'

export function loadRouteList(dispatch) {
  axios.get(`${BACKEND_URL}/getroutes`)
  .then((res) => {
    const routes = res.data;
    dispatch(loadRoutesAction(routes))
  });
}

export function loadTripList(dispatch) {
  axios.get(`${BACKEND_URL}/gettrips`)
  .then(res => {
    const trips = res.data;
    dispatch(loadTripsAction(trips));
  });
} 


