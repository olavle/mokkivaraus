import { React, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PopUpForm from './PopUpForm';

const App = () => {
  const [reservations, setReservations] = useState([]);
  // const [allEvents, setAllEvents] = useState([
  //   {
  //     title: 'Hello',
  //     date: '2020-11-01',
  //   },
  //   {
  //     title: 'Test event',
  //     start: '2020-11-02',
  //     end: '2020-11-05'
  //   },
  // ]);

  const [removed, setRemoved] = useState('');

  async function getData() {
    const url = 'http://localhost:4000/api/reservations';

    // const response = await fetch(url);
    // let fetchedData = await response.json();
    // setReservations(fetchedData);

    fetch(url)
      .then(response => response.json())
      .then(data => setReservations(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, [removed]);

  const removeEvent = (id) => {
    const requestOptions = {
      method: 'POST'
  };
  fetch(`http://localhost:4000/api/reservations/${id}`, requestOptions)
    .then(response => response.json())
    .then(data => console.log('resdata is', data));
    setRemoved(id);
  }

  return (
    <div>
      <h1>Varauskalenteri</h1>
      <p>{removed}</p>
      <PopUpForm />
      <div className='test'>
        
          <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          firstDay={1}
          events={reservations.map(data => {
            return({
              title: data.title,
              start: data.starting_date,
              end: data.ending_date,
              color: `#${Math.floor(Math.random() * Math.floor(999999))}`,
              id: data._id
            })
          })}
          eventClick={(info) => removeEvent(info.event.id)}
        />
        
      </div>
    </div>
  );
};

export default App;
