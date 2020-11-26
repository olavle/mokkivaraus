import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function PopUpForm(props) {
  const [open, setOpen] = React.useState(false);
  const [reservation, setReservation] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
      setReservation({
          ...reservation,
          [event.target.name]: event.target.value
      });
  };

  const postData = (props) => {
      const requestOptions = {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            ...reservation,
            starting_date: reservation.starting_date + 'T00:00:00.000Z',
            ending_date: reservation.ending_date + 'T00:00:00.000Z'
        })
      };
      fetch('http://localhost:4000/api/reservations', requestOptions)
        .then(response => response.json())
        .then(data => console.log('resdata is', data));
      handleClose();
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create new reservation
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can make a new reservation for you!
          </DialogContentText>
          <TextField
            margin="normal"
            id="name"
            label="Full Name"
            type="text"
            fullWidth
            name='title'
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            id="startingDate"
            label="Starting date of your visit"
            type="date"
            InputLabelProps={{
                shrink: true,
              }}
            fullWidth
            name='starting_date'
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            id="endingDate"
            label="Ending date of your visit"
            type="date"
            InputLabelProps={{
                shrink: true,
              }}
            fullWidth
            name='ending_date'
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={postData} color="primary">
            Create new!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
