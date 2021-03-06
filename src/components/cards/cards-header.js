const CardsHeader = props => {
    const { results, location, latitude, longitude } = props;
    
    return (
        <div className="cards-header">
            
            <h3>{location && results && `${location}`}</h3>
            <h3>{location && results && latitude && `${latitude}, ${longitude}`}</h3>
            <h4>{results && latitude && `${results.length} results`  }</h4> 
        </div>
    );
  };

export default CardsHeader;