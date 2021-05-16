import React, { useEffect, useContext } from "react";
import { TripContext, loadTripList } from "../store.js";
import { Container, Row, Col } from "react-bootstrap";

export default function TripList() {
  const { store, dispatch } = useContext(TripContext);
  const { trips } = store;

  useEffect(() => {
    loadTripList(dispatch);
  }, []);

  return (
    <Container>
      <Row>
        <Col className="mt-5">
          {trips.map((trip, index) => (
            <h2 key={index}>{trip.name}</h2>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
