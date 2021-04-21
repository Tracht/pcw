import './searchForm.css'; 

const SearchForm = props => {
    const { onSubmit, label, inputValue, inputText, onInputChange, error, submitText } = props;
    
    return(
        <div className="search-container">
            <form onSubmit={onSubmit} className="search-form">
                <label>
                    <span>{label}</span>
                    <input type="text" placeholder={inputText}
                        id={inputText} name={inputText}
                        value={inputValue} onChange={onInputChange}
                    />
                </label>
                <button type="submit" value="Submit">{submitText}</button>
            </form>

            <p>{error}</p>
        </div>
    );
};
export default SearchForm;