import './App.css';
import React from 'react';
import {Container, Row, Col } from 'react-bootstrap'
import TripList from '../src/components/TripList.jsx'
import { TripProvider } from './store.js'

function App() {
  return (
    <TripProvider>
      <Container>
        <Row>
          <Col>
            <h1>Trips</h1>
            <TripList />
          </Col>
        </Row>
      </Container>
    </TripProvider>
  );
}

export default App;
