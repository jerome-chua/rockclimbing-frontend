import React, { useEffect, useContext } from "react";
import { TripContext, loadTripList } from "../store.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function TripList() {
  const { store, dispatch } = useContext(TripContext);
  const { trips } = store;

  useEffect(() => {
    loadTripList(dispatch);
  }, []);

  return (
    <div>
      {trips.map(({ name }, index) => (
        <h1>{name}</h1>
      ))}
    </div>
  );
}
