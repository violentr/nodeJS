import React, { useState, useEffect } from "react"
import MovieDataService from "../services/movies"
import { Link, useParams } from "react-router-dom"

const Movie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  })
  const getMovie = (movieId) => {
    MovieDataService.get(movieId)
      .then((response) => setMovie(response.data))
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    if (id) {
      getMovie(id)
    }
  }, [id])

  return <div></div>
}
export default Movie
