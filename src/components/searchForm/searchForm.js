import './searchForm.css'; 

const SearchForm = props => {
    const { onSubmit, form, onInputChange, error, submitText } = props;
    
    return(
        <div className="search-container">
            <form onSubmit={onSubmit} className="search-form">
                
                <label>
                    <span>Postcode</span>
                    <input type="text" placeholder="postcode"
                        id="postcode" name="postcode"
                        value={form} onChange={onInputChange}
                    />
                </label>

                <label>
                    <span>Search radius (meters)</span>
                    <input type="number" id="radius" name="radius"
                        min="10" max="10000"
                        value={form} onChange={onInputChange}
                    />
                </label>

                <button type="submit" value="Submit">{submitText}</button>
            </form>

            <p>{error}</p>
        </div>
    );
};
export default SearchForm;