import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import GenreFilter from './components/GenreFilter';
import MovieDetails from './components/MovieDetails';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_MOVIE_EXPLORER_API_KEY; // Access the api API key from .env.local
  
  const FetchMovies = async (page = 1) => {
    setLoading(true);
    setError(null);
    let apiUrl = ''; // input the correct api url here

    if(!apiKey) {
      setError('API key not found. Please ensure REACT_APP_MOVIE_EXPLORER_API_KE is set in .env.local and the server is restarted.');
      setLoading(false);
      return;
    }

    if(searchTerm) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&include_adult=true&language=en-US&page=${page}`;
    }
  }
  return (
    <div className="app">
      <h1>Movie Explorer</h1>
    </div>
  );
}

export default App;
