import React, { useState, useEffect, useCallback } from 'react';
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
  const [genres, setGenres] = useState([]);
  const apiKey = process.env.REACT_APP_MOVIE_EXPLORER_API_KEY; // Access the api API key from .env.local
  
  // Fetch movie genres from the API
  //CHANGED: Wrapped fetchGenres in useCallback
  const fetchGenres = useCallback(async () => {
    if (!apiKey) {
      console.error('API key not found. Please ensure REACT_APP_MOVIE_EXPLORER_API_KEY is set in .env.local and the server is restarted.');
    return;
    }
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`;
    try {
      const response = await fetch(genreUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch genres: ${response.status}`);
      }
      const data = await response.json();
      setGenres(data.genres || []);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  }, [apiKey]); //Changed: Added apiKey to fetchGenre's dependency array

  

//CHANGED: Wrapped fetchMovies in useCallback
  const fetchMovies = useCallback(async (page = 1) => { //argument is newpage from the pagination component
    setLoading(true);
    setError(null);
    if(!apiKey) {
      setError('API key not found. Please ensure REACT_APP_MOVIE_EXPLORER_API_KEY is set in .env.local and the server is restarted.');
      setLoading(false);
      return;
    }

    let apiUrl; //Declare apiUrl here to be set conditionally

    if (searchTerm) {
      //CHANGED: Use /search/movie for title search
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=${page}`;
    } else if (selectedGenre) {
      //Use /discover/movie with genre if only genre is selected
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${selectedGenre}`;
    } else {
      //Default to movie lists/popular if no search term or genre is selected
      apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
    }
      try {
        const response = await fetch(apiUrl);
        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results || []);

        setTotalPages(Math.min(data.total_pages || 1, 500)); //Limit total pages to 500
        setCurrentPage(page);
      } catch (err) {
        setError('Failed to fetch movies.');
        console.error('Error fetching movies:', err);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }, [apiKey, selectedGenre, searchTerm]);


  //CHANGED: Modified useEffect and its dependency array
  useEffect(() => {
    fetchMovies(1); //fatch movies is called as a side effect after the conmponent has rendered and the browser has updates the DOM
    fetchGenres(); //call fetchGenre when the component mounts
  }, [apiKey, selectedGenre, searchTerm, fetchMovies, fetchGenres]); //dependency array indicates that when any of the items change fetchMovies(1) will rerun 
  //CHANGED: Added fetchMovies and fetchGenres to the useEffect fependency array
  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handleGenreFilter = (genreId) => {
    setSelectedGenre(genreId);
    setSearchTerm(''); //Clear search term when genre is selected
    setCurrentPage(1);
  };

  const handlePageChange =(newPage) => { //newPage parameter comes from pagination component
    if (newPage >= 1 && newPage <= totalPages) {
      fetchMovies(newPage);
    }
  };

  const handleMovieClick = (movieId) => { //movieId comes from MovieList component
    setSelectedMovieId(movieId);
  }

  const handleCloseDetails = () => {
    setSelectedMovieId(null);
  };

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="app">
      <h1>Movie Explorer</h1>
      <SearchBar onSearch={handleSearch} />
      <GenreFilter genres={genres} onFilter={handleGenreFilter} selectedGenre={selectedGenre} />    
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
      {selectedMovieId && (
        <MovieDetails movieId={selectedMovieId} onClose={handleCloseDetails} />
      )}
    </div>
  );
}

export default App;
