import { distance } from '../../utils/utils';

const CardContent = props => {
    const { result, coordinates } = props;
    const latitude = coordinates.latitude; 
    const longitude = coordinates.longitude; 

    return (
        <div className="content">
            <p key={result.pageid + result.title + 'distance'}> 
                {result.coordinates ? 
                    `${distance(latitude, longitude, result.coordinates[0].lat, result.coordinates[0].lon, 'K')} km` 
                    : 'distance information not available'} 
            </p>

            <a key={result.pageid + result.title + 'url'} 
                href={result.fullurl} target="_blank" 
                rel="noreferrer">
                learn more
            </a>
        </div>
    );
  };

export default CardContent;