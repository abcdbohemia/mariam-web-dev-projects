import React, { useState, useEffect } from 'react';
import './MovieDetails.css'; 

function MovieDetails({ movieId, onClose }) {
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = process.env.REACT_APP_MOVIE_EXPLORER_API_KEY;

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!apiKey) {
                setError('API key not found. Please ensure REACT_APP_MOVIE_EXPLORER_API_KEY is set in .env.local and the server is restarted.');
                setLoading(false);
                return;
            }
            const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`; //Movie Details
            try {
                const response = await fetch(detailsUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch movie details: ${response.status}`);
                }
                const data = await response.json();
                setMovieDetails(data);
                setLoading(false);
            } catch (err) { 
                setError('Failed to fetch movie details.');
                console.error('Error fetching movie details:', err);
                setLoading(false);
            }
        };

        if (movieId) {
            setLoading(true);
            fetchMovieDetails();
        } else {
            setMovieDetails(null);
            setLoading(false);
            setError(null);
        }
    }, [movieId, apiKey]);

    if (!movieId) {
        return null; // Don't desplay anything if no movie is selected
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!movieDetails) {
        return <p>Could not load movie details.</p>;
    }

    const imageUrl = movieDetails.poseter_path? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`: 'https://placehold.co/200x300?text=No+Poster'; //Configuration w/apiKey: [baseurl][size][filepath] 

    const genresList = movieDetails.genres? movieDetails.genres.map(genre => genre.name).join(', ') : 'N/A';

    return (
        <div className="movie-details-overlay">
            <div className="movie-details">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <img src={imageUrl} alt={movieDetails.title} className="movie-poster" />
                <div className="details-content">
                    <h2>{movieDetails.title}</h2>
                    <p className="tagline">{movieDetails.tagline}</p>
                    <p><strong>Reslease Date:</strong> {movieDetails.release_date}</p>
                    <p><strong>Genres:</strong>{genresList}</p>
                    <p><strong>Overview:</strong> {movieDetails.overview}</p>
                    <p><strong>Rating:</strong> {movieDetails.vote_average} / 10 ({
                    movieDetails.vote_count} votes)</p>
                    {movieDetails.homepage && (
                        <p><strong>Homepage:</strong> <a 
                            href={movieDetails.homepage} 
                            target="_blank" rel="noopener noreferrer">{movieDetails.homepage}
                        </a></p>
                        )}
                </div>
            </div>
        </div>
    );
}



export default MovieDetails;