import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [postcode, setPostcode] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [message, setMessage] = useState('');

  const postcodeChange = (e) => {
    const {value} = e.target;
    setPostcode(value);
  }

  const postcodeSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`http://api.postcodes.io/postcodes/${postcode}`)
      .then(res => {
        setLatitude(res.data.result.latitude);
        setLongitude(res.data.result.longitude);
        setPostcode(''); // resets the form
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data.error);
        setMessage(err.response.data.error);
        setLatitude('');
        setLongitude('');
      })
  }

  return (
  <div className="App">
    
      <div className="header-container">
        <h1>UK Postcode Wikipedia</h1>
        {latitude && longitude ? <h3>Your location: ({latitude}, {longitude}) </h3> : null }
      </div>

      <div className="search-container">
        {/* <Search onClick={} /> */}
        
        <form onSubmit={postcodeSubmit}>
          <label htmlFor="postcode">Postcode</label> <br></br>
          <input type="text" placeholder="postcode" 
            id="postcode" name="postcode" 
            value={postcode} onChange={postcodeChange}/>
          <button type="submit" value="Submit">Submit</button>
        </form>
        <p>{message}</p>
      </div>

      <div className="body">
        {/* <Cards props={}/> */}
      </div>

      <div className="footer">
        {/* <Pagination props={} /> */}
      </div>
    
  </div>
  );
}
export default App;
