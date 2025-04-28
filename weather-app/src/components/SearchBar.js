import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [inputText, setInputText] = useState('');
    const handleChange = ( event ) => { 
        setInputText(event.target.value);
    };

    const handleSubmit = ( event ) => {
        event.preventDefault(); // prevent the default form submission
        if (inputText.trim()) { //checks to see if result of inputText.trim is a truthy value (none empty string). could also use explicit check-> if (inputText.trim() !=="") 
            onSearch(inputText.trim()); //call the onSearch prop with the trimmed city name
            setInputText(''); //Clear the input field after submission
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                placeholder="Enter city"
                value={inputText}
                onChange={handleChange} //lexical scoping
                id="cityInput"
                name="city"
            />
        <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;