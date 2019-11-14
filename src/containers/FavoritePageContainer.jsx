import React, { Component } from "react";
import FavoriteElement from "../components/FavoriteElement.jsx";

const FavoritePageContainer = props => {
  return (
    <div>
      <h3>My favorites</h3>
      <div>
        {props.favorites.map((el, i) => (
          <FavoriteElement
            i={i}
            el={el}
            imgSrc={el.image}
            name={el.name}
            id={el.id}
            category={el.category}
            address1={el.location.address1}
            address2={el.location.address2}
            city={el.location.city}
            state={el.location.state}
            zipCode={el.location.zip_code}
            phone={el.phone}
            deleteBtnInFavsPg={props.deleteBtnInFavsPg}            
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritePageContainer;
