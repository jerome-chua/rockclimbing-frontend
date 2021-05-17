import React, { useEffect, useContext } from "react";
import { TripContext, loadTripList, loadRouteList } from "../store.js";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const StyledContainer = styled.div`
  margin: 8px;
  padding: 5px;
  border: 1px solid lightgrey;
  border-radius: 15px;
`;

const TripTitle = styled.h3`
  padding: 8px;
  font-family: monaco;
  text-transform: capitalize;
`;

const RouteName = styled.li`
  display: flex;
  align-items: center;
  border: solid 2px #d0d0d0;
  border-radius: 10px;
  padding: 0.5em 0.8em 0.5em 0.5em;
  margin-bottom: 0.5em;
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
                <DragDropContext>
                  <Droppable droppableId="routes">
                    {(provided) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {routes.map((route, index) => (
                          <Draggable
                            key={route.id}
                            draggableId={route.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <RouteName
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                {route.name}
                              </RouteName>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </StyledContainer>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
