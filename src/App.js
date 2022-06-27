import { useState, useEffect } from 'react';

import './App.css';
import SearchIcon from './search.svg';

import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=851c72cc';

const movie1 = {
  
    "Title": "Batman v Superman: Dawn of Justice Ultimate Edition",
    "Year": "2016",
    "imdbID": "tt18689424",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYzgyMTMzZjUtNGNjMy00NTJjLWIzNDYtMTc2YzQwOGE5MGM4XkEyXkFqcGdeQXVyMTUwODYzMjcw._V1_SX300.jpg"
}


const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }
  
  useEffect(() => {
    searchMovies('Superman');
  }, []);
  return (
    <div className='app'>
      <h1> Movieverse </h1>

      <div className='search'>
        <input
           placeholder='Search for your favourite Movies..'
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)} 
        
        />
        
      </div>

      {
        movies?.length > 0
          ? (
            <div className='container'>
            {movies.map((movie) => (
              <MovieCard movie = {movie}/>
            ))}
    
            </div>
          ) : (
            <div className="empty">
              <h2> Oops! No movie found</h2>
            </div>
          )
      }



    </div>
  );
}

export default App;
