import React, { useEffect, useContext } from "react";
import { TripContext, loadTripList, loadRouteList } from "../store.js";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const StyledContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const TripTitle = styled.h3`
  padding: 8px;
`;

export default function TripList() {
  console.log("----------- Render Happened -----------");
  const { store, dispatch } = useContext(TripContext);
  const { trips, routes } = store;

  useEffect(() => {
    loadTripList(dispatch);
    loadRouteList(dispatch);
  }, []);

  // Mmanipulate to get array for each trip name.
  const tripRoutes = {};

  trips.forEach((trip) => {
    tripRoutes[trip.name] = [];
    routes.forEach((route) => {
      if (route.tripId === trip.id) {
        tripRoutes[trip.name].push(route);
      }
    });
  });

  return (
    <Container>
      <Row>
        {Object.entries(tripRoutes).map(([trip, routes]) => {
          return (
            <Col>
              <StyledContainer>
                <TripTitle>{trip}</TripTitle>
                <ul>
                  {routes.map((route) => (
                    <li>{route.name}</li>
                  ))}
                </ul>
              </StyledContainer>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
