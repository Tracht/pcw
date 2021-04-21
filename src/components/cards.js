import './cards.css'; 
import noImg from '../assets/no-image-avail.jpg'

const Cards = props => {
    const { results, latitude, longitude, distance } = props;
    
    return(
    <div>
        <header>
            <h4>{results && `${results.length} results`}</h4> 
        </header>

        <div className="cards">
            { results && results.map(result => {
                return (
                    <article className="card" key={result.pageid}>
                        <p key={result.pageid + result.title}>{result.title}</p> 

                        {result.thumbnail && result.thumbnail.source 
                            ?
                            <img key={result.pageid + result.title + 'img'} 
                                src={result.thumbnail && result.thumbnail.source}
                                target="_blank"
                                alt={'image of' + result.title}
                            /> 
                            : <img key={result.pageid + result.title + 'img'} 
                                src={noImg} 
                                target="_blank"
                                alt={'No image available'}
                                /> 

                        }

                        <div classNamea="content">
                            <p key={result.pageid + result.title + 'distance'}> {result.coordinates ? `${distance(latitude, longitude, result.coordinates[0].lat, result.coordinates[0].lon, 'K')} km` : 'no distance information available'} </p>

                            <a key={result.pageid + result.title + 'url'} href={result.fullurl} target="_blank">learn more</a>
                        </div>
                    </article>
                    )
                })
            }

      </div>
    </div>
    );
};
export default Cards;