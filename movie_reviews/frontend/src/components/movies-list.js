import React, { useState, useEffect } from "react"
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"

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

  const find = (query, by) => {
    MovieDataService.find(query, by)
      .then((response) => {
        console.log(response.data)
        setMovies(response.data.movies)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  const findByTitle = () => {
    find(searchTitle, "title")
  }
  const findByRating = () => {
    if (searchRating === "All Ratings") {
      retrieveMovies()
    } else {
      find(searchRating, "rated")
    }
  }

  return (
    <div className="app">
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search by title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={findByTitle}>
              Search
            </Button>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control as="select" onChange={onChangeSearchRating}>
                {ratings.map((rating) => {
                  return (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  )
                })}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="button" onClick={findByRating}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
export default MoviesList
