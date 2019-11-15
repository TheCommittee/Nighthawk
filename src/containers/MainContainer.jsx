import React, { Component, useEffect } from "react";
import "../css/LandingPage.css";
import CategoryContainer from "./CategoryContainer.jsx";
import VenueContainer from "./VenueContainer.jsx";
import LoginPage from "../components/LoginPage.jsx";
import SignUpPage from "../components/SignUpPage.jsx";
import axios from "axios";
import FavoritePageContainer from "./FavoritePageContainer.jsx";

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // user information
      formUsername: "",
      formPassword: "",
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
      mapName: "",
      // components for favoriting restaurants
      favorites: [],
      favoriteIds: [],

      // components for conditional rendering of containers
      loginPage: true,
      signupPage: false,
      homePage: true,
      categoryPage: false,
      venuePage: false,
      favsColoring : false,

      //openTableId
      openTableId: undefined
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
    this.moveMap = this.moveMap.bind(this);
    this.renderOpenTable = this.renderOpenTable.bind(this);
    this.headerFavsBtn = this.headerFavsBtn.bind(this);
    this.deleteBtnInFavsPg = this.deleteBtnInFavsPg.bind(this);
    this.backButton = this.backButton.bind(this);
    this.logoutBtn = this.logoutBtn.bind(this);
  }

  // functions used for login and signup
  loginButton() {
    this.setState({
      loginPage: true,
      signupPage: false,
      homePage: true,
      categoryPage: false,
      venuePage: false
    });
  }



  signupButton() {
    this.setState({
      loginPage: false,
      signupPage: true,
      homePage: true,
      categoryPage: false,
      venuePage: false
    });
  }

  renderOpenTable(value) {
    const script = document.createElement("script");
  }

  headerFavsBtn() {
    this.setState(prevState => ({
      toggleFavorites: !prevState.toggleFavorites,
      loginPage: false,
      signupPage: false,
      categoryPage: false,
      venuePage: false
    }));
  }
  backButton(val){
    console.log('im in back button')
    if (this.state.toggleFavorites === true && val === 'f') {
      this.setState({
        toggleFavorites: false,
        categoryPage: true,
        venuePage: false,
      })
    } else if (this.state.venuePage === true && val === 'v') {
      console.log(document.getElementById('bagel'))
      // widget.parentNode.removeChild(widget)
      this.setState({
        categoryPage: true,
        venuePage: false
      })
    }

  }
  deleteBtnInFavsPg(id) {
    const copyFavs = [...this.state.favorites];
    const index = copyFavs.indexOf(id);
    copyFavs.splice(index, 1);
    this.setState({ favorites: copyFavs });
    axios.post("/dbRouter/updateFav", {
      username: this.state.formUsername,
      favorites: this.state.favorites
    });
  }

  // functions used for search bar
  setInputValue(event) {
    const updateObject = {};
    updateObject[event.target.name] = event.target.value;
    this.setState(updateObject);
  }

  handleLogin() {
    axios
      .post("/dbRouter/login", {
        username: this.state.formUsername,
        password: this.state.formPassword
      })
      .then(response => {
        if (response.data.userData != null) {
          // console.log(response.data.userData);
          const newFavoriteIds = [];
          response.data.userData.favorites.forEach(element => {
            newFavoriteIds.push(element.id);
          });
          this.setState({
            userData: response.data.userData,
            loginPage: false,
            favorites: response.data.userData.favorites,
            favoriteIds: newFavoriteIds
          });
        }
      });
  }

  handleSignup() {
    axios
      .post("/dbRouter/signup", {
        username: this.state.formUsername,
        password: this.state.formPassword
      })
      .then(response => {
        if (response.data.userData != null) {
          // console.log(response.data.userData);
          this.setState({
            userData: response.data.userData,
            signupPage: false,
            loginPage: false
          });
        }
      });
  }

  search() {
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
        // console.log("PARSEDDATA: ", parsedData);
        const listOfBusinesses = [];
        for (let i = 0; i < parsedData.businesses.length; i += 1) {
          let waitTime = "Unknown";
          if (parsedData.businesses[i].price) {
            waitTime = Math.floor(
              Math.random() * 10 * parsedData.businesses[i].price.length
            );
            if (waitTime < 10) {
              waitTime = "No Wait";
            } else {
              waitTime += " min";
            }
          }
          listOfBusinesses.push({
            id: parsedData.businesses[i].id,
            name: parsedData.businesses[i].name,
            image: parsedData.businesses[i].image_url,
            location: parsedData.businesses[i].location,
            waitTime,
            category: parsedData.businesses[i].categories[0].title,
            latitude: parsedData.businesses[i].coordinates.latitude,
            longitude: parsedData.businesses[i].coordinates.longitude
            // console.log(parsedData.businesses.length)
          });
        }

        // this.setState({ latitude: firstBusinessLatitude.toString(), longitude: firstBusinessLongitude.toString() })

        this.setState(state => {
          return {
            searchResults: listOfBusinesses,
            mapName: parsedData.businesses[0].name
          };
        });
        // console.log(this.state.searchResults);
        // }
      });
    this.setState({
      loginPage: false,
      signupPage: false,
      homePage: false,
      categoryPage: true,
      venuePage: false,
      formUsername: "",
      formPassword: "",
      userData: {},
      favoriteIds: [],
      favorites: []
    });
  }

  moveMap() {
    console.log("in moveMap!");
    let target = document.querySelectorAll(".list-item");
    let myItem = target[0];
    for (let i = 0; i < target.length; i++) {
      if (target[i].getBoundingClientRect().top < 300) {
        myItem = target[i].childNodes[1].data;
      }
      this.setState({ mapName: myItem });
      console.log("MY ITEM --->", myItem);
    }
  }

  addToFavorites(e, venue) {
    e.stopPropagation();
    console.log("in addToFavorites");
    let tempFav = this.state.favorites;
    let tempFavIds = this.state.favoriteIds;
    for (let i = 0; i < this.state.searchResults.length; i++) {
      if (this.state.searchResults[i].id === venue.id) {
        if (tempFavIds.indexOf(venue.id) === -1) {
          tempFav.push(venue);
          tempFavIds.push(venue.id);
          this.setState({ favorites: tempFav, favoriteIds: tempFavIds });

          axios
            .post("/dbRouter/updateFav", {
              username: this.state.formUsername,
              favorites: this.state.favorites
            })
            .then(response => {
              console.log(response);
            });

          console.log("this.state.favorites -->", this.state.favorites);
          break;
        } else {
          console.log("IN ELSE STATEMENT");
          let index = tempFavIds.indexOf(venue.id);
          tempFav.splice(index, 1);
          tempFavIds.splice(index, 1);
          this.setState({ favorites: tempFav, favoriteIds: tempFavIds });

          // .then(this.setState({ favorites: tempFav }));
          axios
            .post("/dbRouter/updateFav", {
              username: this.state.formUsername,
              favorites: this.state.favorites
            })
            .then(response => {
              console.log(response);
              // this.setState({ favorites: tempFav, favoriteIds: tempFavIds });
            });
        }
      }
    }
  }

  // functions used for to select a specific venue on the category page to display on the venue page
  selectVenue(id, name, url, image, location, phone, latitude, longitude) {
    // console.log(id);
    console.log("venueName --->", venueName);

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

  logoutBtn() {
    this.setState({
      loginPage: true,
      homePage: true,
      categoryPage: false,
      venuePage: false
    });
  }

  render() {
    // conditional rendering for the login page
    let login = null;
    if (this.state.loginPage) {
      login = (
        <LoginPage
          setInputValue={this.setInputValue}
          handleLogin={this.handleLogin}
          signupButton={this.signupButton}
        />
      );
    }

    // conditional rendering for the signup page
    let signup = null;
    if (this.state.signupPage) {
      signup = (
        <SignUpPage
          setInputValue={this.setInputValue}
          handleSignup={this.handleSignup}
          loginButton={this.loginButton}
        />
      );
    }

    // conditional rendering for the homepage; default true (shows first)
    let home = null;
    if (this.state.homePage) {
      // document.body.style.background =
      //   "url('https://i.ebayimg.com/images/g/Mh4AAOSwlUhbjBHg/s-l1600.jpg')";
      home = (
        <div id="home-content">
          {/* // uncomment to work on login and signup functionalities
        <button onClick={this.loginButton}>Login</button> */}
          {this.state.userData.username && (
            <h2 className="welcome">( Hi {this.state.userData.username} )</h2>
          )}
          <div id="logo">
            <h1>Nighthawk</h1>
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

    //SEONG ADDED**************************************************************************************************************************************************************************************************************************
    let favoritePage = null;

    if (this.state.toggleFavorites) {
      favoritePage = (
        <FavoritePageContainer
          favorites={this.state.favorites}
          deleteBtnInFavsPg={this.deleteBtnInFavsPg}
          backButton={this.backButton}
        />
      );
    }

    // conditional rendering for the category page
    let category = null;
    if (this.state.categoryPage) {
      // document.body.style.background = "url('')";

      category = (
        <CategoryContainer
          // props for search bar
          setInputValue={this.setInputValue}
          search={this.search}
          favorites={this.state.favorites}
          addToFavorites={this.addToFavorites}
          moveMap={this.moveMap}
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
          headerFavsBtn={this.headerFavsBtn}
          favoriteIds={this.state.favoriteIds}
          logoutBtn={this.logoutBtn}
        />
      );
    }

    // conditional rendering for the venue page
    let venue = null;
    if (this.state.venuePage) {
      venue = (
        <VenueContainer
          // props for search bar
            backButton={this.backButton}
            search={this.search}
          setInputValue={this.setInputValue}
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
          renderOpenTable={this.renderOpenTable}
          openTableId={this.state.openTableId}
        />
      );
    }

    return (
      <div>
        {login}
        {signup}
        {favoritePage}
        {home}
        {category}
        {venue}
      </div>
    );
  }
}

export default MainContainer;
