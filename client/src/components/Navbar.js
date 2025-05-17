import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BiExit } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import './styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const [pseudo, setPseudo] = useState(null);
  const [propi,setPropi] = useState(false);

  useEffect(() => {
    const storedNom = sessionStorage.getItem("nom");
    const storedPrenom = sessionStorage.getItem("prenom");
    const storedStatut = sessionStorage.getItem("statut");
    if(storedNom && storedPrenom){
      setPseudo(`${storedNom} ${storedPrenom}`);
    }
    if(storedStatut==='propri'){
      setPropi(true)
    }
  }, []);

  const handleDisconnect = () => {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("nom");
    sessionStorage.removeItem("prenom");
    sessionStorage.removeItem("statut");
    navigate("/");
    window.location.reload();
  }

  return (
    <nav className="navbar">
      <div className="column-right">
        <ul className="navbar-list">
          <li>
            <Link to="/"><img src="../../img/logo.png" className='logo' alt="Home"/></Link>
          </li>
        </ul>
      </div>
      
      <div className="column-left">
        <ul className="navbar-list">
          {propi ? (
            <>
              <li className="navbar-item Ajouter">
                <Link to="/add">Ajouter</Link>
              </li>
              <li className="navbar-item Ajouter">
                <Link to="/noslogements">Mes logements</Link>
              </li>
            </>
          ) : (
            <li className="navbar-item reservations">
              <Link to="/reserv">Réservation</Link>
            </li>
          )}
          <li className="navbar-item connect">
            {pseudo ? (
              <p className='pseudo'><FaRegUserCircle />{pseudo}</p>
            ) : (
              <Link to="/connexion">Connexion</Link>
            )}
          </li>
          {pseudo ? (
            <li className="navbar-item disconnect">
              <button className='exit' onClick={handleDisconnect}><BiExit /></button>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
