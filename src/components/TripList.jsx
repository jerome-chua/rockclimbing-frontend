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
  const tripRoutes = {};

  trips.forEach((trip) => {
    tripRoutes[trip.name] = [];
    routes.forEach((route) => {
      if (route.tripId === trip.id) {
        tripRoutes[trip.name].push(route);
      }
    });
  });

  console.log("tripRoutes", tripRoutes);

  return (
    <Container>
      <Row>
        <Col>
          {Object.entries(tripRoutes).map(([trip, routes]) => {
            return (
              <div>
                <h4>{trip}</h4>
                <ul>
                  {routes.map((route) => (
                    <li>{route.name}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}
