import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import '../components/styles/Search.css'

import { IoLocationSharp } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { MdBedroomChild } from "react-icons/md";

const Search = () => {
  const { ville } = useParams();
  const queryParameters = new URLSearchParams(window.location.search);
  const pays = queryParameters.get("pays");
  // const start = queryParameters.get("startDay");
  // const end = queryParameters.get("endDay");
  const total = queryParameters.get("total");
  const rooms = queryParameters.get("rooms");

  const [searchs, setSearchs] = useState([])

  useEffect(() => {
    getSearch();
    // eslint-disable-next-line
  }, []);

  const getSearch = () => {
    axios.post('http://localhost/backend/search.php', {
      ville: ville,
      pays: pays,
      total: total,
      room: rooms
    }).then(res =>{
      setSearchs(res.data);
    })
  }
  
  return (
    <div className='search'>
      <SearchBar/>
      <div className='search-container'>
        {searchs.map(search => (
          <Link to={`/logement/${search.id_logement}`} >
            <div key={search.id_logement} className='search-box'>
              <div className='left'>
                <img src={`../img/id_logement/${search.id_logement}/${search.img}`} className='img-logement' alt=''/>
              </div>
              <div className='center'>
                <div className='title'><span>{search.title} </span></div>
                <div className='loc'>
                  <IoLocationSharp />
                  <span>{search.adresse}, </span>
                  <span>{search.ville} </span>
                  <span>{search.code_postal} </span>
                <span>{search.pays} </span>
                </div>
                <div className='description'><span>{search.description}</span></div>
              </div>
              <div className='right'>
                <div className='personne'>
                  <HiUsers />
                  <span>{search.nombres_personnes}</span>
                </div>
                <div className='rooms'>
                  <MdBedroomChild />
                  <span>{search.nombre_de_chambres}</span>
                </div>
                <div className='prices'><span>{search.prix_par_nuit}€/Nuit</span></div>
              </div>
            </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Search;
