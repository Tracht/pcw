import './searchForm.css'; 

const SearchForm = props => {
    const { onSubmit, label, inputValue, inputText, onInputChange, error, submitText } = props;
    
    return(
        <div className="search-container">
            <form onSubmit={onSubmit}>
                <label htmlFor={inputText}>{label}</label> <br></br>

                <input type="text" placeholder={inputText}
                    id={inputText} name={inputText}
                    value={inputValue} onChange={onInputChange}
                />
                
                <button type="submit" value="Submit">{submitText}</button>
            </form>

            <p>{error}</p>
        </div>
    );
};
export default SearchForm;