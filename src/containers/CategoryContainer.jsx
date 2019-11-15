import React, { Component } from "react";
import SearchDisplay from "../components/SearchDisplay.jsx";
import Map from "../components/Map.jsx";
// import debounce from "lodash.debounce";
import "../css/CategoryPage.css";

let currentItem;
class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.props.search();
    this.state = {
      mapName: ""
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    document.onscroll = function() {
      let target = document.querySelectorAll(".list-item");
      currentItem = target[0];
      for (let i = 0; i < target.length; i++) {
        if (target[i].getBoundingClientRect().top < 300) {
          currentItem = target[i].childNodes[1].data;
        }
      }
      this.setState({ mapName: currentItem });
      console.log("MY ITEM --->", this.state.mapName);
    }.bind(this);
  }
  render() {
    // render map and list of businessess from searchResults arr in the state
    let search = null;
    let searchDisplayResults = this.props.searchResults.map((element, i) => {
      // console.log("ELEMENT -> ", element);
      return (
        <div id="list">
          <button
            className="list-item searchItem"
            key={i}
            onClick={() =>
              this.props.selectVenue(
                element.id,
                element.name,
                element.url,
                element.image,
                element.location,
                element.phone,
                element.latitude,
                element.longitude
              )
            }
          >
            <img src={`${element.image}`} alt="venue pic" />
            {element.name}
            <br />
            {element.category}
            <br />
            {element.location.address1} {element.location.address2}
            <br />
            {element.location.city}, {element.location.state}{" "}
            {element.location.zip_code}
            {element.phone}
            <br />
            Wait Time: {element.waitTime}
            {/* // need to grab the unique id provided from the yelp api data search results that are saved in state. need to use it to save into our database */}
            {/* <button onClick={() => this.props.selectVenue(element.id, element.name, element.url, element.image, element.location, element.phone)}>Select</button> */}
            <div
              className="favbtn"
              id={
                this.props.favorites.indexOf(element) === -1
                  ? null
                  : "background-red"
              }
              onClick={e => {
                this.props.addToFavorites(e, element);
              }}
            >
              Favorite
            </div>
          </button>
        </div>
      );
    });
    console.log("searchDisplayResults", searchDisplayResults);

    if (this.props.categoryPage) {
      search = (
        <div id="category-body">
          <SearchDisplay searchDisplayResults={searchDisplayResults} />
          <Map
            name={this.state.mapName || this.props.mapName}
            venueLocation={this.props.venueLocation}
            latitude={this.props.latitude}
            longitude={this.props.longitude}
          />
        </div>
      );
    }

    return (
      <div>
        <section className="search-bar">
          <input
            type="input"
            id="searchInput"
            name="searchInput"
            placeholder="Business or Category"
            onChange={this.props.setInputValue}
          />
          <input
            type="input"
            id="location"
            name="location"
            placeholder="Location"
            onChange={this.props.setInputValue}
          />
          <input type="button" id="searchButton" onClick={this.props.search} />
          <input
            type="button"
            id="headerFavsBtn"
            value="My Favorites"
            onClick={this.props.headerFavsBtn}
          />
          <input
            type="button"
            id="logoutBtn"
            value="Logout"
            onClick={this.props.logoutBtn}
          />
        </section>
        {search}
      </div>
    );
  }
}

export default CategoryContainer;
