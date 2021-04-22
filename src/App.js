import './App.css'; 
import React from 'react';
import Header from './components/header/header';
import SearchForm from './components/searchForm/searchForm';
import Cards from './components/cards/cards';
import { GetNearestWiki } from './hooks/getNearestWiki';

const App = () => {
  const { form, coordinates, location, error, wikiResult, setForm, getPostcode, getWikiResponse } = GetNearestWiki();

  function postcodeChange (e) {
    const {name, value} = e.target;
    setForm({ ...form, [name]: value })
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
        inputValue={form}
        onInputChange={postcodeChange}
        error={error}
        submitText="submit"
      />

      <Cards 
        results={wikiResult} 
        location={location}
        coordinates={coordinates}
      />
    
  </div>
  );
}
export default App;
