import React from 'react';
import { TripProvider } from './store'
import {Container, Row, Col } from 'react-bootstrap'
import TripList from '../src/components/TripList.jsx'

export default function App() {

  return (
    <TripProvider>
      <Container>
        <Row>
          <Col>
            <h1 className='mt-3 mb-5 text-center'>Trips</h1>
              <TripList />
          </Col>
        </Row>
      </Container>
    </TripProvider>
  );
}
