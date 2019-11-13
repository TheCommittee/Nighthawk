import React, { Component } from "react";
import axios from "axios";
// import FavoritePage from "../components/FavoritePage.jsx";

const FavoritePageContainer = props => {
  console.log('this is props',props.favorites)
  // const favs = props.favorites.map((data, i)=>{return <div id={i} >
  //   <img />
  // </div>})
  const favs = [];
  for (let i=0; i<props.favorites.length; i++){
    favs.push(<div key={i}><img src={props.favorites[i].image} />
      {props.favorites[i].name}
      <br />
      {props.favorites[i].category}
      <br />
      {props.favorites[i].location.address1} {props.favorites[i].location.address2}
      <br />
      {props.favorites[i].location.city}, {props.favorites[i].location.state}
      {props.favorites[i].location.zip_code}
      {props.favorites[i].phone}
      <br />
      
      </div>)
  }
  // console.log('this is favs', favs)
    return (
      <div>
        <h3>My favorites</h3>
        {/* <FavoritePage  */}
        {/* {props.favorites.map((data, i) =>{return <div id={i} >{data}</div> })} */}
        <div id="fav-page-items">{favs}</div>
      </div>
    );
  }

export default FavoritePageContainer;
