import { React, useEffect, useState, Component } from "react";
import { listReservations } from './API/reservations';

const App = () => {
  const [reservations, setReservations] = useState([]);

  const addReservations = async () => {
    const entries = await listReservations();
    setReservations(entries);
  }

  useEffect(() => {
    addReservations();
  }, [])

  return (
    <div>
      <h1>Varauskalenteri</h1>
    </div>
  );
};

export default App;
