import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [inputText, setInputText] = useState('');

    const handleChange = (changeEvent) => {
        setInputText(changeEvent.target.value);
    };

    const handleSubmit = (submitEvent) => {
        submitEvent.preventDefault(); // Prevent default form submission

        // Check if inputText is non-empty after trimming
        if (inputText.trim()) {
            onSearch(inputText.trim()); // Call the onSearch prop with the trimmed city name
            setInputText(''); // Clear the input field after submission
        }
    };

    return ( //JSX ..describing the UI that SearchBar should render
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter city"
                value={inputText}
                onChange={handleChange} // Lexical scoping
                id="cityInput"
                name="city"
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;