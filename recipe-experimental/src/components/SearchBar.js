import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch}) {
    const [searchTerm, setSearchTerm] = useState('');
    const handleInputChange = (event) => {
        
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(searchTerm);
            setSearchTerm('');
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search for recipes..." 
            value={searchTerm} onChange={handleInputChange} 
            onKeyUp={handleKeyUp} 
            />
            <button onClick={handleSearchClick}>Search</button>
        </div>
    );
}

export default SearchBar;