import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Reserv from './pages/Reserv';
import Connexion from './pages/Connexion';
import Search from './pages/Search';
import Add from './pages/Add';
import Logement from './pages/Logement';
import './App.css'
import NosLoges from './pages/NosLogement';



function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reserv" element={<Reserv />} />
          <Route path='/add' element={<Add />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/search/:ville" element={<Search />} />
          <Route path="/logement/:idLoge" element={<Logement />} />
          <Route path="/noslogements" element={<NosLoges/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

