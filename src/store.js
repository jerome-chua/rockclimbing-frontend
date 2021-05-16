import axios from 'axios';
import React, { useReducer } from 'react';

// State & dispatch.
const initialState = {
  trips: [],
  routes: [],
};

const LOAD_TRIPS = 'LOAD_TRIPS';

export function tripReducer(state, action) {
  switch (action.type) {
    case LOAD_TRIPS:
      return {...state, trips: action.payload}

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

export function loadTripList(dispatch) {
  axios.get(`${BACKEND_URL}/gettrips`)
  .then(res => {
    const trips = res.data;
    dispatch(loadTripsAction(trips));
  })
} 
