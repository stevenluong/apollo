import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWithRouterAccess from '../Base/AppWithRouterAccess';


const App = () => {
  return (
    <Router basename={"apollo"}>
      <AppWithRouterAccess/>
    </Router>
  );
}
export default App;
