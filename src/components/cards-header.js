const CardsHeader = props => {
    const { results } = props;
    
    return (
        <div className="cards-header">
            <h4>{results && `${results.length} results`}</h4> 
        </div>
    );
  };

export default CardsHeader;