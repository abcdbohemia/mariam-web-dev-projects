import React, { useState, useRef, useEffect } from 'react';
import './GenreFilter.css';

function GenreFilter({ genres, onFilter, selectedGenre }) {
    const [isOpen, setIsOpen] = useState(false); // Track dropdown open/close state
    const dropdownRef = useRef(null); // Ref hook for click-outside detection

    // Find the selected genre's name for display
    const selectedGenreName = selectedGenre 
        ? genres.find((genre) => genre.id === selectedGenre)?.name || 'All Genres'
        : 'All Genres';

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Handle genre selection
    const handleSelect = (genreId) => {
        onFilter(genreId); // Call parent handler
        setIsOpen(false); // Close dropdown
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle keyboard navigation for accessibility
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            toggleDropdown();
            event.preventDefault();
        } else if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div className="genre-filter">
            <h2>Filter by Genre</h2>
            <div className={`custom-select ${isOpen ?'open' : ''}`} ref={dropdownRef}>
                <div            
                    className="select-trigger"
                    onClick={toggleDropdown}
                    onKeyDown={handleKeyDown}
                    tabIndex={0} // Makes the element focusable for keyboard events
                    role="combobox" // For screen readers
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                >
                    <span className="selected-text">{selectedGenreName}</span>
                    <span className="arrow" />
                </div>
                {isOpen && (
                    <ul className="dropdown-menu" role="listbox">
                        <li
                            className={`dropdown-item ${!selectedGenre ? 'selected' : ''}`}
                            onClick={() => handleSelect('')}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleSelect('');
                                    e.preventDefault();
                                }
                            }}
                            tabIndex={0}
                            role="option"
                            aria-selected={!selectedGenre}
                        >
                            All Genres
                        </li>
                        {genres.map((genre) => (
                            <li
                                key={genre.id}
                                className={`dropdown-item ${selectedGenre === genre.id ? 'selected' : ''}`}
                                onClick={() => handleSelect(genre.id)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleSelect(genre.id);
                                        e.preventDefault();
                                    }
                                }}
                                tabIndex={0}
                                role="option"
                                aria-selected={selectedGenre === genre.id}
                            >
                                {genre.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default GenreFilter;