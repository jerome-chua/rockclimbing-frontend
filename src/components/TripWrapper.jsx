import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TripContext, loadTripRoutes } from "../store.js";
import TripList from "./TripList.jsx";

export default function TripWrapper() {
  const { store, dispatch } = useContext(TripContext);
  const { tripRoutes } = store;

  useEffect(() => {
    loadTripRoutes(dispatch);
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mt-3 mb-5 text-center lead">A L L - T R I P S</h1>
          <TripList tripRoutes={tripRoutes} />
        </Col>
      </Row>
    </Container>
  );
}
