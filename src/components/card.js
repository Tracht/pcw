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

            <CardContent 
                key={result.pageid + result.title + 'content'}
                latitude={latitude}
                longitude={longitude}
                result={result}
            />
        </article>
    );
  };

export default Card;