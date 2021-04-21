import { distance } from '../utils/index';

const CardContent = props => {
    const { result, latitude, longitude } = props;
    return (
        <div className="content">
            <p key={result.pageid + result.title + 'distance'}> {result.coordinates ? `${distance(latitude, longitude, result.coordinates[0].lat, result.coordinates[0].lon, 'K')} km` : 'distance information not available'} </p>
            <a key={result.pageid + result.title + 'url'} href={result.fullurl} target="_blank">learn more</a>
        </div>
    );
  };

export default CardContent;