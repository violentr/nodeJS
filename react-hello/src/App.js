import React, { useContext, useEffect } from 'react';
import { Context } from './context';
import {Link, Route, Routes} from 'react-router-dom';
import Navbar  from './components/Navbar';
import Signup from './pages/Signup';


 const App = () => {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {}, []);
  return (
    <>
      <Navbar auth={false} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
