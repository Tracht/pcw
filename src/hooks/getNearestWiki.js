import { useState } from 'react'; 
import axios from 'axios';
import { sortAtoZ } from '../utils/utils';
import { createWikiAPI } from '../api/api';

function GetNearestWiki() {
    const [form, setForm] = useState({});
    const [coordinates, setCoordinates] = useState({});
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [wikiResult, setWikiResult] = useState(null);

    function setAppStateSuccess(lat, long, district, country){
        setCoordinates({ latitude: lat, longitude: long});
        setLocation(`${district}, ${country}`);
        setError('');
      }
    
    function resetAppState(){
        setCoordinates({ latitude: "", longitude: ""});
        setLocation('');
        setWikiResult(null);
    }
    
    async function getPostcode() {
        let { postcode, radius } = form;
        try {
          const postcodeResponse = await axios.get(`http://api.postcodes.io/postcodes/${postcode}`);
          const { latitude, longitude, admin_district, country } = postcodeResponse.data.result;
          setAppStateSuccess(latitude, longitude, admin_district, country);
          return createWikiAPI(latitude, longitude, radius); // returns the WIKI API with the lat & long coordinates in the get request
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
          const hasResults = wikiResponse.data.query; 
          
          if (hasResults) { 
            const result = wikiResponse.data.query.pages;
            const arrayResult = Object.entries(result).map(element => {
                return element[1]; // we don't need index[0] (which are the pageIDs - they are already in index[1])
            })
            setWikiResult(sortAtoZ(arrayResult, "title"));
          }
          else {
            setError("No results available.")
          }
          
        }
        catch (err) {
          console.log(err);
          resetAppState();
        }
    }

    return { form, coordinates, location, error, wikiResult, setForm, getPostcode, getWikiResponse }
}

export { GetNearestWiki };