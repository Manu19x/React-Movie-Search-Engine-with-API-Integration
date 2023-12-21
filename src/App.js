import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

///6294b667
import './App.css'
import SearchIcon from './search.svg'
const API_URL = 'http://www.omdbapi.com?apikey=6294b667';

const movie1={
        "Title": "Italian Spiderman",
        "Year": "2007",
        "imdbID": "tt2705436",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg"
    }

const App=()=> {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

 const getRandomMovies = async () => {
        const response = await fetch(`${API_URL}&s=cinema`); // Poți înlocui "random" cu criteriul dorit pentru filme la întâmplare
        const data = await response.json();
        setMovies(data.Search);
    }

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()

        setMovies(data.Search);
    }

    useEffect(() => {
        if (searchTerm) {
            searchMovies(searchTerm); // Caută filme bazate pe termenul de căutare
        } else {
            getRandomMovies(); // Afișează filme la întâmplare sau după criteriu când nu se efectuează nicio căutare
        }
    }, [searchTerm]);

    return(
        <div className="app">
            <h1>MovieWorld</h1>

            <div className="search">
            <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for movies"
        />
        <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
        />
      </div>
            {
            movies?.length>0
            ? (
                <div className="container">
                {movies.map((movie)=> (
                    <MovieCard movie={movie}/>
                ))}
               </div>
            ) : (
                <div className="empty">
                <h2> no movies found</h2>
                </div>
            )
        }
       
        </div>

       
    )
}
export default App;