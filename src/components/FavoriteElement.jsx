import React from "react";
import { tsPropertySignature } from "@babel/types";
import "../css/CategoryPage.css";


const FavoriteElement = props => {
  console.log("this is favoritepage", props.i);
  return (
    <React.Fragment>
      <div id={props.id} key={props.i} className="fav-item">
        <img src={props.imgSrc} />
        {props.name}
        <br />
        {props.category}
        <br />
        {props.address1}
        {props.address2}
        <br />
        {props.city}
        {props.state}
        <br />
        {props.zip_code}
        <br />
        {props.phone}
      </div>
      <div
        className="favbtn"
        onClick={() => {props.deleteBtnInFavsPg(props.el);}}>
        delete
      </div>

    </React.Fragment>
  );
};

export default FavoriteElement;
