import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [postcode, setPostcode] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const postcodeChange = (e) => {
    const {value} = e.target;
    setPostcode(value);
  }

  async function getNearestWiki() {
    try {
      // Step 1: get lat and long from postcode API
      const postcodeResponse = await axios.get(`http://api.postcodes.io/postcodes/${postcode}`);
      const { latitude, longitude, admin_district, country } = postcodeResponse.data.result;
      console.log(postcodeResponse.data.result);
     
      // Step 2: set state, reset form & message
      setLatitude(latitude);
      setLongitude(longitude);
      setLocation(`${admin_district}, ${country}`);
      setPostcode('');
      setError('');
      
      // Step 3: Create the WIKI url GET request
      let url = "https://en.wikipedia.org/w/api.php?origin=*";
      const params = {
        action: "query",
        format: "json",
        prop: "coordinates|pageimages",
        generator: "geosearch",
        piprop: "thumbnail|images",
        pithumbsize: "50",
        pilimit: "50",
        ggscoord: `${latitude}|-${longitude}`, // lat, long
        ggsradius: "500", // radius in meters
        ggslimit: "10", // maximum number of pages to return
      };

      Object.keys(params).forEach(key => {
        url += "&" + key + "=" + params[key]
      });
      console.log("wiki url:", url);

      // Step 4: Make the request to the Wiki URL
      const wikiResponse = await axios.get(url, {mode: 'cors'});
      console.log("wiki result:", wikiResponse);

    } 
    catch (err) {
      console.log("err", err);
      console.log("err.response.data.error", err.response.data.error);
      setError(err.response.data.error);
      setLatitude('');
      setLongitude('');
      setLocation('');
    }
  }

  const postcodeSubmit = (e) => {
    e.preventDefault();
    getNearestWiki();
  }

  return (
  <div className="App">
    
      <div className="header-container">
        <h1>UK Postcode Wikipedia</h1>
        { location ? <h3> {location} </h3> : null }
        { latitude && longitude ? <h4>({latitude}, {longitude}) </h4> : null }
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
        <p>{error}</p>
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
