import React from 'react';
import { TripProvider } from './store'
import TripWrapper from  "../src/components/TripWrapper.jsx";


export default function App() {

  return (
    <TripProvider>
      <TripWrapper />
    </TripProvider>
  );
}
