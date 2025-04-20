import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange =  (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClick = () => {
        onSearch(searchTerm); //notify the parent component about the search term 
    };

    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="search-container">
            <input type="text" placeholder="Search recipes..." 
                value={searchTerm}
                 onChange={handleChange} 
                 onKeyDown={handleKeyDown} />
            <button onClick={handleClick}>Search</button>
        </div>
    );
}

export default SearchBar;