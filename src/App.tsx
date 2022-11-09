import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {Routes, Navigate} from "react-router-dom";
import {
  BrowserRouter as Router, Route
} from "react-router-dom";
import Post from "./components/Post/Post";
import PostsList from "./components/PostsList/PostsList";

function App() {
  return (
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/posts' element={<PostsList/>}/>
          <Route path="/" element={<Navigate to="/posts" replace/>} />
          <Route path='/posts/:id' element={<Post />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
