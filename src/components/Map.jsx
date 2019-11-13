import React from 'react';
import axios from 'axios';

const Map = (props) => {

    const test = props.name.replace(/[^A-Za-z]/g, "")


  return (
    <div id="map">
        {console.log(test)}
      <iframe
        width="500"
        height="400"
        frameBorder="0"
        // #12 before ${props.venueLatitude} in src link specifies zoom (smaller number = less zoom)
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBa3IwbgGlZ80JTt97JZnl63Rz23uQKrYE&q=${test}`}>
      </iframe>
    </div>
  )
}

export default Map;
