import React, { useState, useEffect } from 'react';
import './GenreFilter.css';
import SearchBar from './SearchBar';

function GenreFilter({ genres, onFilter, selectedGenre }){
return (
    <div className="genre-filter">
        <h2>Filter by Genre</h2>
        <select value={selectedGenre} onChange={(e) => onFilter(e.target.value)}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
        </select>
    </div>
); 
}

export default GenreFilter;