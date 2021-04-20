import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [postcode, setPostcode] = useState('');
  const [postcodeSuccess, setPostcodeSuccess] = ('');
  const [postcodeError, setPostcodeError] = ('');
  const [postcodeResult, setPostcodeResult] = ('');

  const initialFormState = {
    postcode: ''
  }

  // Get Postcode Lat & Long
  useEffect(() => {
    axios
      .get(`api.postcodes.io/postcodes/${postcode}`)
      .then(response => {
        console.log(response);
        setPostcodeResult(response);
      })
      .catch(error => {
        console.log(error);
      })
  }, [postcode]);

  const postcodeChange = (e) => {
    const {value} = e.target;
    setPostcode(value);
  }

  const postcodeSubmit = (e) => {
    e.preventDefault();
    setPostcode(initialFormState); // resets the form
  }

  return (
  <div class="App">
    
      <div class="header-container">
        <h1>Postcode Wikipedia</h1>
      </div>

      <div class="search-container">
        {/* <Search onClick={} /> */}
        
        <form onSubmit={postcodeSubmit}>
          <label htmlFor="postcode">Postcode</label> <br></br>
          <input type="text" placeholder="postcode" 
            id="postcode" name="postcode" 
            value={postcode} onChange={postcodeChange}/>
          <button type="submit" value="Submit">Submit</button>
        </form>
      </div>

      <div class="body">
        {/* <Cards props={}/> */}
      </div>

      <div class="footer">
        {/* <Pagination props={} /> */}
      </div>
    
  </div>
  );
}
export default App;
