import axios from "axios"
URL = "http://localhost:3000/api/v1"

class MovieDataService {
    getAll(page=0) {
        return axios.get(`${URL}/movies?page=${page}`)
    }
    get(id) {
        return axios.get(`${URL}/movies/id/${id}`)
    }
    find(query, by="title", page=0) {
        return axios.get(`${URL}/movies/find?query=${query}&by=${by}&page=${page}`)
    }

    createReview(data){
        return axios.post(`${URL}/movies/review`, data)
    }
    updateReview(id, data){
        return axios.put(`${URL}/movies/review`, data)
    }
    deleteReview(id, userId){
        return axios.delete(`${URL}/movies/review`, {data: {review_id: id, user_id: userId}})
    }
}