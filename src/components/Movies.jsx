import React, { useState } from 'react'
import axios from 'axios';

import '../style/movies-style.css';
import BottomPane from './Movies components/BottomPane';
import RightPane from './Movies components/RightPane';

export default function Movies() {

    const APIKey = process.env.REACT_APP_MOVIES_API;

    const [movie, setMovie] = useState("");

    const [data, setData] = useState({
        genre: "", director: "", writer: "", actors: "",
        releasedDate: "", runtime: "", imdb: "", rottenTomatoes: "", boxOffice: "",
        plot: "", poster: "images/movies.jpg",
    });
    let submitHandler = () => {
        axios.get(`http://www.omdbapi.com/?t=${movie}&apikey=${APIKey}`)
            .then((response) => {
                setData({
                    genre: response.data.Genre,
                    director: response.data.Director,
                    writer: response.data.Writer,
                    actors: response.data.Actors,
                    releasedDate: response.data.Released,
                    runtime: response.data.Runtime,
                    imdb: response.data.Ratings[0].Value,
                    rottenTomatoes: response.data.Ratings[1].Value,
                    boxOffice: response.data.BoxOffice,
                    plot: response.data.Plot,
                    poster: response.data.Poster,
                })
            })
        setMovie("");
    }

    return (
        <div id='movies'>
            <div id='movies-top'>
                <input type="text" placeholder='Enter movie' autoFocus value={movie} onChange={(e) => setMovie(e.target.value)}/>
                <button type="submit" onClick={submitHandler}>Go</button>
            </div>
            <BottomPane data={data}/>
            <RightPane data={data}/>
        </div>
    )
}