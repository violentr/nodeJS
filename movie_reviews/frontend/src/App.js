import React from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <h1>Movie Reviews</h1>
        <Link to="/movies">Movies</Link>
    </div>
  );
}
export default App;
