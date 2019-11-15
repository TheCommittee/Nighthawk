import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import VenueDetails from "../components/VenueDetails.jsx";
import WaitTimesDisplay from "../components/WaitTimesDisplay.jsx";
import "../css/VenuePage.css";
import config from './../../config'

const VenueContainer = props => {
  const [openTableIdNum, setOpenTableIdNum] = useState("");

  let openTableName = props.venueName.replace(/[é]/g, "e");
  openTableName = openTableName.replace(/[ã]/g, "a");

  const googleName = props.venueName.replace(/[^A-Za-z]/g, "");


  // useEffect(() => {
  //   if (openTableIdNum !== "") {
  //     const script = document.createElement("script");
  //
  //     script.src = `//www.opentable.com/widget/reservation/loader?rid=${openTableIdNum}&type=standard&theme=standard&iframe=true&domain=com&lang=en-US&newtab=false`;
  //     script.async = false;
  //
  //     document.body.appendChild(script);
  //   }
  // }, [openTableIdNum]);

  useEffect(() => {
    console.log("in useeffect getting", openTableIdNum);

    const openId = fetch(
      `https://opentable.herokuapp.com/api/restaurants?name=${openTableName}&zip=${props.venueLocation.zip_code}`
    )
      .then(data => data.json())
      .then(data => setOpenTableIdNum(data.restaurants[0].id));
  }, []);

  // useEffect(() => {
  //   const openId = fetch(
  //     `https://opentable.herokuapp.com/api/restaurants?name=${openTableName}&zip=${props.venueLocation.zip_code}`
  //   )
  //     .then(data => {
  //       data.json();
  //       console.log(
  //         "NOTE TO TEAM: data doesn't have a restaurants property but were calling `setOpenTableIdNum(data.restaurants[0].id)`. data --->",
  //         data
  //       );
  //     })
  //     .then(data => {
  //       setOpenTableIdNum(data.restaurants[0].id);
  //     });
  // }, []);

  // render map and wait times
  return (
    <div>
      <section className="search-bar">
        <input
          id="searchInput"
          type="input"
          name="searchInput"
          placeholder="Business or Category"
          onChange={e => props.setInputValue(e)}
        />
        <input
          id="location"
          type="input"
          name="location"
          placeholder="Location"
          onChange={e => props.setInputValue(e)}
        />
        <input type="button" id="searchButton" onClick={props.search} />
        <div
          id="back-btn-venue"
          onClick={() => {
            props.backButton("v");
          }}
        >
          back
        </div>
      </section>
      <div id="venue-page">
        <div id="venue-details-column">
          {/*<script type='text/javascript' src='//www.opentable.com/widget/reservation/loader?rid=346594&type=standard&theme=standard&iframe=true&domain=com&lang=en-US&newtab=false'></script>*/}
          <VenueDetails
            venueName={props.venueName}
            venueUrl={props.venueUrl}
            venueImage={props.venueImage}
            venueLocation={props.venueLocation}
            venuePhone={props.venuePhone}
          />
        </div>

        <div id="venue-map">
          <iframe
            width="500"
            height="400"
            frameBorder="0"
            // #19 before ${props.venueLatitude} in src link specifies zoom (smaller number = less zoom)
            src={`https://www.google.com/maps/embed/v1/place?key=${config.REACT_APP_NOT_SECRET_CODE}&q=${googleName}`}
          ></iframe>
        </div>
          <iframe width="15%" height="30%" id="ot-widget-container1" src={`https://www.opentable.com/restref/client/?restref=${openTableIdNum}`}></iframe>
      </div>
    </div>
  );
};

export default VenueContainer;
