import './cards.css'; 
import Card from './card';
import CardsHeader from './cards-header';

const Cards = props => {
    const { results, location, latitude, longitude } = props;
    
    return(
    <div className="cards-container">

        <CardsHeader 
            results={results}
            location={location}
            latitude={latitude}
            longitude={longitude}
        />

        <div className="cards-body">
            { results && results.map(result => {
                return (
                    <Card 
                        key={result.pageid}
                        latitude={latitude}
                        longitude={longitude}
                        result={result} />
                    )
                })
            }
      </div>
    </div>
    );
};
export default Cards;