import noImg from '../assets/no-image-avail.jpg'
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

            <div className="content">
                <p key={result.pageid + result.title + 'distance'}> {result.coordinates ? `${distance(latitude, longitude, result.coordinates[0].lat, result.coordinates[0].lon, 'K')} km` : 'distance information not available'} </p>
                <a key={result.pageid + result.title + 'url'} href={result.fullurl} target="_blank">learn more</a>
            </div>
        </article>
    );
  };

export default Card;