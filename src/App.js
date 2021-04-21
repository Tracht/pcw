import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/header';
import SearchForm from './components/searchForm';
import Cards from './components/cards/cards';
import { sortAtoZ } from './utils/utils';
import './App.css'; 

function App() {

  const [postcode, setPostcode] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [wikiResult, setWikiResult] = useState(null);

  const postcodeChange = (e) => {
    const {value} = e.target;
    setPostcode(value);
  }

  async function getNearestWiki() {
    try {
      // Step 1: get lat and long from postcode API
      const postcodeResponse = await axios.get(`http://api.postcodes.io/postcodes/${postcode}`);
      const { latitude, longitude, admin_district, country } = postcodeResponse.data.result;
     
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
        prop: "coordinates|pageimages|info",
        generator: "geosearch",
        inprop: "url",
        inlinkcontext: "Main%20Page",
        piprop: "thumbnail",
        pithumbsize: "350",
        pilimit: "50",
        ggscoord: `${latitude}|${longitude}`, // lat, long
        ggsradius: "1000", // radius in meters
        ggslimit: "100", // maximum number of pages to return
      };

      Object.keys(params).forEach(key => {
        url += "&" + key + "=" + params[key]
      });

      // Step 4: Make the request to the Wiki URL
      const wikiResponse = await axios.get(url, {mode: 'cors'});
      const result = wikiResponse.data.query.pages;
      const arrayResult = Object.entries(result).map(element => { // turn 'result' into an array
        return element[1];
      })
      const sortedResultsAtoZ = sortAtoZ(arrayResult, "title"); // sort it A to Z
      setWikiResult(sortedResultsAtoZ);
    }
    catch (err) {
      const message = err.response.data && err.response.data.error;
      setError(message);
      setLatitude('');
      setLongitude('');
      setLocation('');
      setWikiResult(null);
    }
  }

  const postcodeSubmit = (e) => {
    e.preventDefault();
    getNearestWiki();
  }

  return (
  <div className="app-container">
    
      <Header 
        title="UK Postcode Wikipedia"
        subtitle="Check out the history in your backyard!"
      />

      <SearchForm 
        onSubmit={postcodeSubmit}
        label="Postcode"
        inputText="postcode"
        inputValue={postcode}
        onInputChange={postcodeChange}
        error={error}
        submitText="submit"
      />

      <Cards 
        results={wikiResult} 
        location={location}
        latitude={latitude}
        longitude={longitude}
      />
    
  </div>
  );
}
export default App;
