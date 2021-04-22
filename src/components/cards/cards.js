import './cards.css'; 
import Card from './card';
import CardsHeader from './cards-header';

const Cards = props => {
    const { results, location, coordinates } = props;
    
    return(
    <div className="cards-container">

        <CardsHeader 
            results={results}
            location={location}
            coordinates={coordinates}
        />

        <div className="cards-body">
            { results && results.map(result => {
                return (
                    <Card 
                        key={result.pageid}
                        coordinates={coordinates}
                        result={result} />
                    )
                })
            }
      </div>
    </div>
    );
};
export default Cards;