import React, { useState } from 'react';
import axios from 'axios';
import { sortAtoZ, distance } from './utils/index';

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
      console.log("wiki result:", arrayResult);
    }
    catch (err) {
      const message = err.response.data && err.response.data.error;
      setError(message);
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

          <p>{wikiResult && `There are ${wikiResult.length} results`}</p>

          { 
            wikiResult && <ul>
              {
              wikiResult && wikiResult.map(result => {
                return (
                <div>
                  <li>
                    <p key={result.pageid + result.title}> {result.title} </p>
                    <p key={result.pageid + result.title + 'coordinates'}> {result.coordinates ? `Lat: ${result.coordinates[0].lat}, Long: ${result.coordinates[0].lon}` : 'no coordinates available'} </p>
                    <p key={result.pageid + result.title + 'distance'}> {result.coordinates ? `Distance from you: ${distance(latitude, longitude, result.coordinates[0].lat, result.coordinates[0].lon, 'K')} Km` : 'no distance information available'} </p>

                    <img key={result.pageid + result.title + 'img'} src={result.thumbnail && result.thumbnail.source} target="_blank"/> 

                    <a key={result.pageid + result.title + 'imgURL'} href={result.thumbnail && result.thumbnail.source} target="_blank">
                    {result.thumbnail ? '' : 'no picture available'}</a> <br></br>

                    <a key={result.pageid + result.title + 'url'} href={result.fullurl} target="_blank">learn more</a>
                  </li> <br></br>
                </div>
                )
              })
            }
            </ul> 
          }
      </div>
    
  </div>
  );
}
export default App;
