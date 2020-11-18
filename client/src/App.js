import { React, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const App = () => {
  const [reservations, setReservations] = useState([]);
  const [eventobj, setEventobj] = useState({
    title: '',
    date: '',
  });

  const [allEvents, setAllEvents] = useState([
    {
      title: 'Hello',
      date: '2020-11-01',
    },
    {
      title: 'Test event',
      date: '2020-11-02',
    },
    {
      title: 'Helloagain',
      date: '2020-11-01',
    },
    {
      title: 'Test eventasdsa',
      date: '2020-11-02',
    },
    {
      title: 'Helloasdasfgdfc',
      date: '2020-11-01',
    },
    {
      title: 'Test eventuhniikki',
      date: '2020-11-02',
    },
    {
      title: 'Helloaskjkdlkjv',
      date: '2020-11-01',
    },
    {
      title: 'Test event once again this is final',
      date: '2020-11-02',
    },
  ]);

  const getData = () => {
    const url = 'http://localhost:4000/api/reservations';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setReservations(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Varauskalenteri</h1>
      <div className='test'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          firstDay={1}
          events={reservations}
        />
        <table>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
