import React, { Component } from "react";
import "../css/LandingPage.css";
import CategoryContainer from "./CategoryContainer.jsx";
import VenueContainer from "./VenueContainer.jsx";
import LoginPage from "../components/LoginPage.jsx";
import SignUpPage from "../components/SignUpPage.jsx";
import axios from "axios";

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // user information
      formUsername: '',
      formPassword: '',
      userData: {},
      // stateful components used for search bar and results
      location: "",
      searchInput: "",
      searchResults: [],

      // components used for map display
      latitude: "",
      longitude: "",

      // components related to selecting specific venue
      venueId: "",
      venueName: "",
      venueUrl: "",
      venueImage: "",
      venueLocation: "",
      venuePhone: "",
      venueLatitude: "",
      venueLongitude: "",
      waitTime: 0,
      venueWaitTimeList: [],
      mapName: '',

      // components for infinite scrolling functionality
      current: 25,
      total: 50,

      // components for conditional rendering of containers
      loginPage: true,
      signupPage: false,
      homePage: true,
      categoryPage: false,
      venuePage: false,

      // components for favoriting restaurants
      favorites: [],
      favoriteIds: []
    };

    this.loginButton = this.loginButton.bind(this);
    this.signupButton = this.signupButton.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);

    this.setInputValue = this.setInputValue.bind(this);
    this.search = this.search.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);

    this.selectVenue = this.selectVenue.bind(this);
    this.setWaitTime = this.setWaitTime.bind(this);
    this.addWaitTime = this.addWaitTime.bind(this);
  }

  // functions used for login and signup
  loginButton() {
    this.setState({
      loginPage: true,
      signupPage: false,
      homePage: false,
      categoryPage: false,
      venuePage: false
    });
  }
  signupButton() {
    this.setState({
      loginPage: true,
      signupPage: false,
      homePage: false,
      categoryPage: false,
      venuePage: false
    });
  }

  componentDidMount() {
    const script = '//www.opentable.com/widget/reservation/loader?rid=109594&rid=4524&type=multi&theme=standard&iframe=true&domain=com&lang=en-US&newtab=false';

  }

  // functions used for search bar
  setInputValue(event) {
    const updateObject = {};
    updateObject[event.target.name] = event.target.value;
    this.setState(updateObject);
  }

  handleLogin() {
    axios.post('/dbRouter/login', { username: this.state.formUsername, password: this.state.formPassword })
      .then(response => {
        if (response.data.userData != null) {
          // console.log(response.data.userData);
          this.setState({
            userData: response.data.userData,
            loginPage: false,
          });
        }
      }) 
  }

  handleSignup() {
    axios.post('/dbRouter/signup', { username: this.state.formUsername, password: this.state.formPassword })
      .then(response => {
        if (response.data.userData != null) {
          // console.log(response.data.userData);
          this.setState({
            userData: response.data.userData,
            signupPage: false,
            loginPage: false,
          });
        }
      }) 
  }

  search() {
    // console.log('THIS STATE LOCATION : ', this.state.location);
    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchInput: this.state.searchInput,
        location: this.state.location
      })
    })
      .then(response => response.json())
      .then(data => {
        const parsedData = JSON.parse(data);
        // console.log('PARSEDDATA: ', parsedData);
        // console.log('introspecting the data: ', parsedData.businesses[0])

        // Coordinates used for map rendered in Category Container (List Page)
        const firstBusinessLatitude = parsedData.businesses[0].coordinates.latitude;
        const firstBusinessLongitude = parsedData.businesses[0].coordinates.longitude;
        const firstBusinessName = parsedData.businesses[0].name;


        const listOfBusinesses = [];
        // console.log(parsedData.businesses.length)
        if (this.state.current <= 50) {
          for (let i = 0; i < this.state.current; i += 1) {
            // console.log('LIST BUSINESSES -> ', listOfBusinesses)
            listOfBusinesses.push({
              id: parsedData.businesses[i].id,
              name: parsedData.businesses[i].name,
              image: parsedData.businesses[i].image_url,
              location: parsedData.businesses[i].location,
              category: parsedData.businesses[i].categories[0].title,
              latitude: parsedData.businesses[i].coordinates.latitude,
              longitude: parsedData.businesses[i].coordinates.longitude
            });
          }

          // this.setState({ latitude: firstBusinessLatitude.toString(), longitude: firstBusinessLongitude.toString() })

          this.setState(state => {
            return {
              latitude: firstBusinessLatitude.toString(),
              longitude: firstBusinessLongitude.toString(),
              searchResults: listOfBusinesses,
              current: state.current + 5,
              mapName: firstBusinessName,
            };
          });
          // console.log(this.state.searchResults);
        }
      });
    this.setState({
      loginPage: false,
      signupPage: false,
      homePage: false,
      categoryPage: true,
      venuePage: false
    });
  }

  addToFavorites(venue) {
    console.log('this is searchResults', this.state.searchResults);
    let tempFav = this.state.favorites;
    let tempFavIds = this.state.favoriteIds;
    // console.log(“VENUE ---> “, venue);
    for (let i = 0; i < this.state.searchResults.length; i++) {
      if (this.state.searchResults[i].id === venue.id) {
        if (tempFavIds.indexOf(venue.id) === -1) {
          // console.log(this.state.searchResults[i].id);
          // console.log(venue.id);
          console.log('IN IF STATEMENT');
          tempFav.push(venue);
          tempFavIds.push(venue.id);
          console.log('TEMPFAV ---> ', tempFav);
          this.setState({ favorites: tempFav, favoriteIds: tempFavIds });
          console.log('this.state.favorites -->', this.state.favorites);
          axios.post('/addfavorite', {
            restaurant_id: venue
          });
          break;
        } else {
          console.log('IN ELSE STATEMENT');
          let index = tempFavIds.indexOf(venue.id);
          tempFav.splice(index, 1);
          tempFavIds.splice(index, 1);
          this.setState({ favorites: tempFav, favoriteIds: tempFavIds });
          console.log('this.state.favorites -->', this.state.favorites);
          axios.delete('/removefavorite', {
            restaurant_id: venue
          });
          // .then(this.setState({ favorites: tempFav }));
        }
      }
    }
  }




  // functions used for to select a specific venue on the category page to display on the venue page
  selectVenue(id, name, url, image, location, phone, latitude, longitude) {
    // console.log(id);
    const venueId = id;
    const venueName = name;
    const venueUrl = url;
    const venueImage = image;
    const venueLocation = location;
    const venuePhone = phone;
    const venueLatitude = latitude;
    const venueLongitude = longitude;

    this.setState({
      loginPage: false,
      signupPage: false,
      homePage: false,
      categoryPage: false,
      venuePage: true,
      venueId,
      venueName,
      venueUrl,
      venueImage,
      venueLocation,
      venuePhone,
      venueLatitude,
      venueLongitude
    });
  }
  setWaitTime(event) {
    this.setState({ waitTime: event.target.value });
  }
  addWaitTime() {
    // create body from the things we've saved in state through the setwaittime and selectvenue func
    const body = {
      waitTime: this.state.waitTime,
      venueId: this.state.venueId,
      venueName: this.state.venueName
    };
    // console.log(body);
    fetch("/dbRouter/addWaitTime", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => console.log("addwaittime fetch request successful"))
      .catch(err => {
        console.log(`${err}: addWaitTime function error when adding wait time`);
      });
  }

  render() {
    // conditional rendering for the login page
    let login = null;
    if (this.state.loginPage) {

      login = <LoginPage setInputValue={this.setInputValue} handleLogin={this.handleLogin} signupButton={this.signupButton} />;
    }

    // conditional rendering for the signup page
    let signup = null;
    if (this.state.signupPage) {

      signup = <SignUpPage setInputValue={this.setInputValue} handleSignup={this.handleSignup} loginButton={this.loginButton} />;
    }

    // conditional rendering for the homepage; default true (shows first)
    let home = null;
    if (this.state.homePage) {

      document.body.style.background =
        "url('https://images.pexels.com/photos/1604200/pexels-photo-1604200.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
      home = (
        <div id="home-content">
          {/* // uncomment to work on login and signup functionalities
        <button onClick={this.loginButton}>Login</button> */}
          <div id="logo">
            <img
              id="logo-pic"
              src="https://image.flaticon.com/icons/png/512/876/876569.png"
            />
            <h1>Queue</h1>
          </div>
          <section id="home-page-search-bar">
            <input
              type="input"
              id="searchInput"
              name="searchInput"
              placeholder="Business or Category"
              onChange={this.setInputValue}
            />
            <input
              type="input"
              id="location"
              name="location"
              placeholder="Location"
              onChange={this.setInputValue}
            />
            <input type="button" id="searchButton" onClick={this.search} />
          </section>
        </div>
      );
    }

    // conditional rendering for the category page
    let category = null;
    if (this.state.categoryPage) {
      document.body.style.background = "url('')";
      category =
        <CategoryContainer
          // props for search bar
          setInputValue={this.setInputValue}
          search={this.search}
          favorites={this.state.favorites}
          addToFavorites={this.addToFavorites}
          searchInput={this.state.searchInput}
          location={this.state.location}
          searchResults={this.state.searchResults}
          mapName={this.state.mapName}
          selectVenue={this.selectVenue}
          waitTimes={this.state.waitTimes}
          venueName={this.state.venueName}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          venueLocation={this.state.venueLocation}
          homePage={this.state.homePage}
          categoryPage={this.state.categoryPage}
          venuePage={this.state.venuePage}
          current={this.state.current}
        />
    }

    // conditional rendering for the venue page
    let venue = null;
    if (this.state.venuePage) {
      venue =
        <VenueContainer
          // props for search bar
          setInputValue={this.setInputValue}
          search={this.search}

          searchInput={this.state.searchInput}
          location={this.state.location}
          searchResults={this.state.searchResults}

          // props for venue selection
          venueId={this.state.venueId}
          venueName={this.state.venueName}
          venueUrl={this.state.venueUrl}
          venueImage={this.state.venueImage}
          venueLocation={this.state.venueLocation}
          venuePhone={this.state.venuePhone}
          venueWaitTimeList={this.state.venueWaitTimeList}
          venueLatitude={this.state.venueLatitude}
          venueLongitude={this.state.venueLongitude}
          setWaitTime={this.setWaitTime}
          addWaitTime={this.addWaitTime}
          mapName={this.state.mapName}
        />
    }


    return (
      <div>
        {login}
        {signup}
        {home}
        {category}
        {venue}
      </div>
    );
  }
}

export default MainContainer;