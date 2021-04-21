import noImg from '../../assets/no-image-avail.jpg';

const CardImage = props => {
    const { result } = props;
    return (
        <div>
            {result.thumbnail && result.thumbnail.source 
                ?
                <img  
                    src={result.thumbnail && result.thumbnail.source}
                    target="_blank"
                    alt={result.title}
                /> 
                : <img
                    src={noImg} 
                    target="_blank"
                    alt={'None available'}
                    />
            }
        </div>
    );
  };

export default CardImage;

