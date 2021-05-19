import axios from 'axios';
import React, { useReducer } from 'react';

// State & dispatch.
export const initialState = {
  trips: [],
  routes: [],
  isModalOpen: false,
  modalContent: '',
  tripRoutes: {},
};

const LOAD_TRIPS = 'LOAD_TRIPS';
const LOAD_ROUTES = 'LOAD_ROUTES';
const TRIP_ROUTES = 'TRIP_ROUTES';
const ADD_ROUTE = 'ADD_ROUTE';
const NO_VALUE = 'NO_VALUE';
const CLOSE_MODAL = 'CLOSE_MODAL';
const REMOVE_ROUTE = 'REMOVE_ROUTE';
const ADD_DIFFICULTY = 'ADD_DIFFICULTY';

export function tripReducer(state, action) {
  switch (action.type) {
    case LOAD_TRIPS:
      return {
        ...state, 
        trips: action.payload
      }

    case LOAD_ROUTES:
      const allRoutes = [...state.routes, ...action.payload] 
      return {
        ...state, 
        routes: allRoutes,
      }

    case ADD_ROUTE:
      return {
        ...state,
        routes: [...state.routes, action.payload],
        isModalOpen: true,
        modalContent: 'route added',
      }
    
    case TRIP_ROUTES:
      return {
        ...state,
        tripRoutes: {...action.payload}
      }

    case REMOVE_ROUTE:
      return {
        ...state,
        routes: state.routes.filter((route) => route.id !== action.payload)
      }


    case ADD_DIFFICULTY:
      state.routes[action.payload.id].difficulty = action.payload.difficulty;

      return {
        ...state,
      }

    case CLOSE_MODAL:
      return {
        ...state, 
        isModalOpen: false
      }

    case NO_VALUE:
      return {
        ...state,
        isModalOpen: true,
        modalContent: 'please enter a route'
      };


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

export function loadTripRoutesAction(tripRoutes) {
  return {
    type: TRIP_ROUTES,
    payload: tripRoutes,
  }
}

// Provider
export const TripContext = React.createContext(null);
const { Provider } = TripContext;

export function TripProvider({children}) {
  const [store, dispatch] = useReducer(tripReducer, initialState);

  return <Provider value={{store, dispatch}}> {children} </Provider>
}

// Reqyests
const BACKEND_URL = 'http://localhost:3004'
export const difficulty = [1, 2, 3, 4, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.11, 5.12, 5.13, 5.14, 5.15];

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

// get all available routes
export const loadRoutes = (dispatch) => {
  axios
    .get(BACKEND_URL + '/routes/1')
    .then((response) => {
      const routes = response.data.tripRoutes;
      dispatch({type: 'LOAD_ROUTES', payload: routes})
    })
    .catch((error) => console.log(error));
}


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

export async function loadTripRoutes(dispatch) {
  const [trips, routes] = await Promise.all([
    axios.get(`${BACKEND_URL}/gettrips`),
    axios.get(`${BACKEND_URL}/getroutes`)
  ])

  const tripRoutes = {}

  trips.data.forEach(({ name, id }) => {
    tripRoutes[id] = {};
    tripRoutes[id].name = name;
    tripRoutes[id].items = [];
    routes.data.forEach((route) => {
      if (route.tripId === id) {
        tripRoutes[id].items.push(route);
      }
    });
  });

  console.log('tripRoutes', tripRoutes);
  dispatch(loadTripRoutesAction(tripRoutes))
}
