import React, { useEffect, useContext } from "react";
import { TripContext, loadTripList, loadRouteList } from "../store.js";
import { Container, Row, Col } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function TripList() {
  console.log("----------- Render Happened -----------");
  const { store, dispatch } = useContext(TripContext);
  const { trips, routes } = store;

  useEffect(() => {
    loadTripList(dispatch);
    loadRouteList(dispatch);
  }, []);

  // Update trips & routes here (manipulate to get nice array).
  console.log("Routes!", routes);
  console.log("trips!", trips);

  return (
    <Container>
      <Row>
        <Col>
          {trips.map((trip, index) => (
            <h1 key={index}>
              ID: {trip.id}. {trip.name}
            </h1>
          ))}
          {routes.map(({ name, tripId }, index) => (
            <h5 key={index}>
              Trip:{tripId} {name}
            </h5>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
