const CardsHeader = props => {
    const { results, location, coordinates } = props;

    const latitude = coordinates.latitude; 
    const longitude = coordinates.longitude; 
    
    return (
        <div className="cards-header">
            
            <h3>{location && results && `${location}`}</h3>
            <h3>{location && results && coordinates && `${latitude}, ${longitude}`}</h3>
            <h4>{results && coordinates && `${results.length} results`  }</h4> 
        </div>
    );
  };

export default CardsHeader;