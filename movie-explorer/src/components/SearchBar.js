import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const handleChange = (event) => {
        setQuery(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        onSearch(query); // Call the onSearch prop woth the current query 
    };
    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input type="text" placeholder="Search for a movie..." value={query} onChange={handleChange} />
            <button type="submit">Search</button>
        </form>
    );
}


export default SearchBar;