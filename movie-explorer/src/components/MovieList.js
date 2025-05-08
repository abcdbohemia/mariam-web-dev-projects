import React from 'react';
import './MovieList.css';

function MovieList({ movies, onMovieClick }) {
    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <div key={movie.id} className="movie-item" onClick={() => onMovieClick(movie.id)}>
                    {movie.poster_path ? ( <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title} className="movie-poster" />) : (
                        <div className="no-poster">No Poster Available</div> 
                    )}
                    <h3 className="movie-title">{movie.title}</h3>        
                </div>
            ))}
        </div>
    );
}

export default MovieList