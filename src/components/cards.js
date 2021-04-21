const Cards = props => {
    const { results, latitude, longitude, distance } = props;
    
    return(
        <div className="body">

          <p>{results && `${results.length} results`}</p>

          { 
            results && <ul>
              {
              results && results.map(result => {
                return (
                <div key={result.pageid}>
                  <li>
                    <p key={result.pageid + result.title}> {result.title} </p>
                    <p key={result.pageid + result.title + 'distance'}> {result.coordinates ? `${distance(latitude, longitude, result.coordinates[0].lat, result.coordinates[0].lon, 'K')} km` : 'no distance information available'} </p>

                    <img key={result.pageid + result.title + 'img'} src={result.thumbnail && result.thumbnail.source} target="_blank"/> 

                    <a key={result.pageid + result.title + 'imgURL'} href={result.thumbnail && result.thumbnail.source} target="_blank">
                    {result.thumbnail ? '' : 'no picture available'}</a> <br></br>

                    <a key={result.pageid + result.title + 'url'} href={result.fullurl} target="_blank">learn more</a>
                  </li> <br></br>
                </div>
                )
              })
            }
            </ul> 
          }
      </div>
    );
};
export default Cards;