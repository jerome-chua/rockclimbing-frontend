import React from 'react';
import { TripProvider } from './store'
import TripWrapper from  "../src/components/TripWrapper.jsx";
import AddRoute from './components/addRoute.js';

export default function App() {

  return (
    <TripProvider>
      <h2 className='routes-header'>Add Routes</h2>
      <AddRoute />
      <TripWrapper />
    </TripProvider>
  );
}
