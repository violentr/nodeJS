import React, { useState, useEffect } from "react"
import MovieDataService from "../services/movies"
import { Link, useParams } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Image from "react-bootstrap/Image"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

const Movie = (props) => {
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

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster + "/100px250"} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {props.user && (
                  <Link to={"/movies/" + id + "/review"}>Add Review</Link>
                )}
              </Card.Body>
            </Card>
            <br />
            <h2>Reviews</h2>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default Movie
