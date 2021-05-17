import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { TripContext, TripProvider, loadRouteList } from './store'
import {Container, Row, Col } from 'react-bootstrap'
import TripList from '../src/components/TripList.jsx'

// Reqyests
const BACKEND_URL = 'http://localhost:3004'

export default function App() {
  // const { store, dispatch } = useContext(TripContext);
  // const { routes } = store;
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // loadRouteList(dispatch);
     axios.get(`${BACKEND_URL}/getroutes`)
      .then((res) => {
        console.log('routes----', res.data);
        setRoutes(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <TripProvider>
      <Container>
        <Row>
          <Col>
            <h1 className='my-3'>Trips</h1>
            {/* <p>{routes.map((route) => route.name)}</p> */}
            <TripList routes={routes} />
          </Col>
        </Row>
      </Container>
    </TripProvider>
  );
}
