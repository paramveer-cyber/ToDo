import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ToDo from './components/To-do'
import UserProfile from './components/UserProfile'
import Error from "./components/Error";

export default function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<ToDo/>}></Route>
          <Route exact path="/user" element={<UserProfile/>}></Route>
          <Route path="/*" element={<Error/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}
