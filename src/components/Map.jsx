import React from 'react';
import axios from 'axios';

const Map = (props) => {

  return (
    <div id="map">
      <iframe 
        width="500" 
        height="400" 
        // #12 before ${props.venueLatitude} in src link specifies zoom (smaller number = less zoom)
        src={`https://api.maptiler.com/maps/basic/?key=OeKji8TvwQYbzy8G5Pda#12/${props.latitude}/${props.longitude}/`}>
      </iframe>
    </div>
  )
}

export default Map;