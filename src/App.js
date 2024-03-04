// src/App.js
import React from 'react';
import RoomList from './components/RoomList';
import BookingForm from './components/BookingForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <RoomList />
      <BookingForm />
    </div>
  );
}

export default App;
