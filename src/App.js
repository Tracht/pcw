import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/header';
import SearchForm from './components/searchForm';
import Cards from './components/cards/cards';
import { sortAtoZ } from './utils/utils';
import { createWikiAPI } from './api/api';
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
      const wikiResponse = await axios.get(wikiAPI, {mode: 'cors'}); // cors allows a request to a different origin
      const result = wikiResponse.data.query.pages;

      const arrayResult = Object.entries(result).map(element => {
          return element[1]; // we don't need index[0] (which are the pageIDs - they are already in index[1])
      })

      setWikiResult(sortAtoZ(arrayResult, "title"));
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
