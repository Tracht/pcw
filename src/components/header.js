import React from "react";

const Header = props => {
  const { title, location, latitude, longitude } = props;
  return (
    <div className="header-container">
        <h1>{title}</h1>
        { location ? <h3> {location} </h3> : null }
        { latitude && longitude ? <h4>({latitude}, {longitude}) </h4> : null }
    </div>
  );
};
export default Header;