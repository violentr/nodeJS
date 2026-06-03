import axios from "axios"
const API_URL = "http://localhost:5000/api/v1"
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
class MovieDataService {
  getAll(page = 0) {
    return api.get(`/movies?page=${page}`)
  }
  get(id) {
    return api.get(`/movies/id/${id}`)
  }

  getRatings() {
    return api.get(`/movies/ratings`)
  }

  find(query, by = "title", page = 0) {
    return api.get(`/movies?${by}=${query}&by=${by}&page=${page}`)
  }

  createReview({ movieId, review, name, userId }) {
    return api.post(`/movies/review`, {
      movie_id: movieId,
      review,
      name,
      user_id: userId,
    })
  }
  updateReview({ reviewId, review, userId }) {
    return api.put(`/movies/review`, {
      review_id: reviewId,
      review,
      user_id: userId,
    })
  }
  deleteReview({ reviewId, userId }) {
    return api.delete(`/movies/review`, {
      data: { review_id: reviewId, user_id: userId },
    })
  }
}

export default new MovieDataService()
