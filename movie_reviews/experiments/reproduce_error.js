import axios from 'axios';

const testError = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/movies/review', {
            movie_id: "invalid_id", // This should cause an error in new ObjectId()
            review: "Great movie!",
            name: "John Doe",
            user_id: "1234"
        });
        console.log("Response:", response.data);
    } catch (error) {
        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Error Data:", error.response.data);
        } else {
            console.error("Error Message:", error.message);
            console.log("Make sure the server is running on http://localhost:5000");
        }
    }
};

testError();
