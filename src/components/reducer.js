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
    const allRoutes = [...state.routes, action.payload] 
    console.log(allRoutes);
    return {
      ...state,
      routes: allRoutes,
    }
  }

  throw new Error ('no matching action');
}