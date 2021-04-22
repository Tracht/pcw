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

  function postcodeChange (e) {
    const {value} = e.target;
    setPostcode(value);
  }

  function setAppStateSuccess(lat, long, district, country){
    setLatitude(lat);
    setLongitude(long);
    setLocation(`${district}, ${country}`);
    setPostcode('');
    setError('');
  }

  function resetAppState(){
    setLatitude('');
    setLongitude('');
    setLocation('');
    setWikiResult(null);
  }

  function createWikiAPI(lat, long){
    let wikiAPI = "https://en.wikipedia.org/w/api.php?origin=*";
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
      ggscoord: `${lat}|${long}`,
      ggsradius: "1000", // radius in meters
      ggslimit: "100", // max. number of pages
    };

    Object.keys(params).forEach(key => {
      wikiAPI += "&" + key + "=" + params[key]
    });

    return wikiAPI;
  }

  async function getPostcode() {
    try {
      const postcodeResponse = await axios.get(`http://api.postcodes.io/postcodes/${postcode}`);
      const { latitude, longitude, admin_district, country } = postcodeResponse.data.result;
      setAppStateSuccess(latitude, longitude, admin_district, country);
      return createWikiAPI(latitude, longitude); // returns the WIKI API with the lat & long coordinates in the get request
    }
    catch (err) {
      const message = err.response.data && err.response.data.error;
      setError(message);
      resetAppState();
    }
  }

  async function getWikiResponse(wikiAPI){
    try {
      const wikiResponse = await axios.get(wikiAPI, {mode: 'cors'}); 
      const result = wikiResponse.data.query.pages;
      const arrayResult = Object.entries(result).map(element => {
          return element[1]; // we don't need index[0], which are the pageIDs (they are already in index[1])
      })

      const sortedResultsAtoZ = sortAtoZ(arrayResult, "title");
      setWikiResult(sortedResultsAtoZ);
    }
    catch (err) {
      console.log(err);
      resetAppState();
    }
  }

  async function postcodeSubmit(e) {
    e.preventDefault();
    const postcodeResult = await getPostcode();
    const wikiResponse = await getWikiResponse(postcodeResult);
    return wikiResponse;
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
