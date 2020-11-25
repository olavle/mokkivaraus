import { React, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const App = () => {
  const [reservations, setReservations] = useState([]);
  const [allEvents, setAllEvents] = useState([
    {
      title: 'Hello',
      date: '2020-11-01',
    },
    {
      title: 'Test event',
      start: '2020-11-02',
      end: '2020-11-05'
    },
  ]);


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
  }, []);
  

  return (
    <div>
      <h1>Varauskalenteri</h1>
      <div className='test'>
        {
          reservations.length === 0 ? 'Loading the calendar...'
          :
          <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          firstDay={1}
          weekNumberCalculation='ISO'
          events={reservations.map(data => {
            return({
              title: data.title,
              start: data.starting_date,
              end: data.ending_date,
              color: `#${Math.floor(Math.random() * Math.floor(999999))}`
            })
          })}
        />
        }

        <table>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
