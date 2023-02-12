import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App = () =>  {
  const pageSize = 15;
  // apiKey = process.env.REACT_APP_NEWS_API   //this is our API key and this one is connect with env.local you can check it in that paricule file 
  const apiKey = "198200bc9a7d44ffb00053c7e21ef42a"
 

  const [progress, setProgress] = useState(0)   //this is for loading bar 


    return (

    <div>
    <Router>
    <NavBar/>
    <LoadingBar   //this is our loading bar which we are seeing while reload ------ the red line 
    height= {3}
        color='red'
        progress={progress}   
      />
    
 
    <Routes> 
          <Route exact path="/"  element={<News setProgress = {setProgress} apiKey= {apiKey}  key="general" pageSize={pageSize} country="in" category="general"/>}></Route>
          <Route exact path="/business" element={<News setProgress = {setProgress} apiKey = {apiKey} key="business" pageSize={pageSize} country="in" category="business"/>}></Route>
          <Route exact path="/technology" element={<News setProgress = {setProgress} apiKey= {apiKey} key="technology" pageSize={pageSize} country="in" category="technolgy"/>}></Route>
          <Route exact path="/entertainment" element={<News setProgress = {setProgress} apiKey= {apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}></Route>
          <Route exact path="/health" element={<News setProgress = {setProgress} apiKey= {apiKey} key="health" pageSize={pageSize} country="in" category="health"/>}></Route>
          <Route exact path="/science" element={<News setProgress = {setProgress} apiKey= {apiKey} key="science" pageSize={pageSize} country="in" category="science"/>}></Route>
          <Route exact path="/sports" element={<News setProgress = {setProgress} apiKey= {apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>}></Route>
          </Routes>
          </Router>
          </div>
    )
  
}

export default App 











