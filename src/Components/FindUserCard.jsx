import React from "react";

function FindUserCard({image,name}) {
  return (
    <div className="user">
      <div className="searchImgAndusernameContainer">
        <div className="userimgcontainer">
          <img
            src={image}
            alt=""
          />
        </div>
        <h4>{name}</h4>
      </div>
      <button>Add</button>
    </div>
  );
}

export default FindUserCard;
