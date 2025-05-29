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

  // Fetch keyword ID for the search term 
  //CHANGED: Wrapped fetchKeywordId in useCallback
  const fetchKeywordId = useCallback(async (searchTerm) => {
    const keywordUrl =`https://api.themoviedb.org/3/search/keyword?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&page=1`;
    try {
      const response = await fetch(keywordUrl);
      if (!response.ok) {
        throw new Error(`Keyword search failed: ${response.status}`);
      }
      const data = await response.json(); 
      //Return the first keyword ID if available, otherwise null
      return data.results[0]?.id || null; // results is an array of objects, easch object has an id and name, we are extracting the id
    } catch (error) {
      console.error('Error fetching keyword:', error);
      return null;
    }
  }, [apiKey]); //CHANGED: Added apiKey to fetchKeywordId's dependency array

//CHANGED: Wrapped fetchMovies in useCallback
  const fetchMovies = useCallback(async (page = 1) => { //argument is newpage from the pagination component
    setLoading(true);
    setError(null);
    if(!apiKey) {
      setError('API key not found. Please ensure REACT_APP_MOVIE_EXPLORER_API_KEY is set in .env.local and the server is restarted.');
      setLoading(false);
      return;
    }
    // Use /discover/movie as the base endpoint to return list of movies ranked by popularity
    let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=${page}`; //using the newpage value here as well
    try {
      // Add genre filter if provided
      if (selectedGenre) { // curly braces optional for single statement if blocks 
        apiUrl += `&with_genres=${selectedGenre}`;
      }
      // Add keyword filter if searchTerm is provided
      if (searchTerm) {
        const keywordId = await fetchKeywordId(searchTerm);
        if (keywordId) {
          apiUrl += `&with_keywords=${keywordId}` ;
        } else {
          // No keyword found; show error or return empty results
        setError(`No keyword found for search term: "${searchTerm}". Try a different term.`);
        setMovies([]);
        setTotalPages(1);
        setLoading(false);
        return;
        }
       }
       // If no filters are applied, use /movie/popular
       if (!searchTerm && !selectedGenre) {
        apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
       }
       const response = await fetch(apiUrl);
       if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
       }
       const data = await response.json();
       setMovies(data.results || []);
       setTotalPages(Math.min(data.total_pages || 1, 500)); //Limit total pages to 500
       setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch movies.'); // we re-render the app component, and if(error) block is executed
      console.error('Error fetching movies:', err ); //err here equals the message of the new error that was thrown above
      setTotalPages(1);
    } finally { // designed to execute no matter what happens? right?
      setLoading(false);
    }
  }, [apiKey, selectedGenre, searchTerm, fetchKeywordId]); //CHANGED: Added fetchKeywordId to fetchMovies's dependency array

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
