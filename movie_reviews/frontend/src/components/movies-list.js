import React, { useState, useEffect } from "react"
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"

const MoviesList = (props) => {
  const [movies, setMovies] = useState([])
  const [searchTitle, setSearchTitle] = useState("")
  const [searchRating, setSearchRating] = useState("")
  const [ratings, setRatings] = useState(["All Ratings"])

  useEffect(() => {
    retrieveMovies()
    retrieveRatings()
  }, [])

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then((response) => {
        console.log(response.data)
        setMovies(response.data.movies)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => {
        console.log(response.data)
        setRatings(["All Ratings"].concat(response.data))
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value
    setSearchTitle(searchTitle)
  }

  const onChangeSearchRating = (e) => {
    const searchRating = e.target.value
    setSearchRating(searchRating)
  }
  return <div className="app"></div>
}
export default MoviesList
