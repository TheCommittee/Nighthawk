import React from "react";
import axios from "axios";

const Map = props => {
  const googleName = props.name.replace(/[^A-Za-z]/g, "");

  return (
    <div id="map">
      <iframe
        title="googleMap"
        width="500"
        height="400"
        frameBorder="0"
        // #12 before ${props.venueLatitude} in src link specifies zoom (smaller number = less zoom)
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCpOaMC0kkcCOIZQfF966NVFXcpdF91q08&q=${googleName}`}
      ></iframe>
    </div>
  );
};

export default Map;
