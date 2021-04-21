import { distance } from '../utils/index';
import CardTitle from './card-title';
import CardImage from './card-image';
import CardContent from './card-content';


const Card = props => {
    const { result, latitude, longitude } = props;
    return (
        <article className="card">
            <CardTitle 
                key={result.pageid + result.title}
                title={result.title}
            />

            <CardImage
                key={result.pageid + result.title + 'img'}
                result={result}
            />

            <div className="content">
                <p key={result.pageid + result.title + 'distance'}> {result.coordinates ? `${distance(latitude, longitude, result.coordinates[0].lat, result.coordinates[0].lon, 'K')} km` : 'distance information not available'} </p>
                <a key={result.pageid + result.title + 'url'} href={result.fullurl} target="_blank">learn more</a>
            </div>
        </article>
    );
  };

export default Card;