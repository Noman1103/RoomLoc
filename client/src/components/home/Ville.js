import React, { useState } from 'react';
import './../styles/home/Ville.css'
import { Link } from 'react-router-dom';

const VilleList = () => {
    const [villes] = useState([
            {description: 'Paris, capitale de la France, est célèbre pour son histoire riche, sa culture et son architecture magnifique. Surnommée "La Ville Lumière", elle attire des millions de visiteurs chaque année.',
            drapeau: "France.jpg",
            id: "1",  
            img: "Paris.jpg",
            ville: "Paris" },

            {description: "Londres, capitale du Royaume-Uni, est une métropole dynamique et cosmopolite réputée pour sa riche histoire, sa culture diversifiée, et son influence mondiale.",
            drapeau: "Royaume-uni.jpg",
            id: "2",
            img: "Londres.jpg",
            ville: "London"}, 

            {description: "Rome, capitale de l'Italie, est une ville fascinante connue pour son histoire millénaire, son architecture impressionnante, et sa culture vibrante.",
            drapeau: "Italie.jpg",
            id: "3",
            img: "Rome.jpg",
            ville: "Rome"},

            {description: "Barcelone, capitale de la Catalogne en Espagne, est une ville vibrante et colorée, connue pour son architecture unique, ses plages ensoleillées, et sa culture animée.",
            drapeau: "Espagne.jpg",
            id: "4",
            img: "Barcelone.jpg",
            ville: "Barcelone"}
    ]);

    return (
        <div className='ville-containber'>
            {villes.map(ville => (
                <div key={ville.id} className="ville-box">
                    <Link to={`/search/${ville.ville}`}>
                        <div className='ville'>
                            <span>{ville.ville}</span>
                            <img src={`img/Ville/Drapeau/${ville.drapeau}`} width={36} alt=""/>
                        </div>
                        <img className="ville-img" src={`img/Ville/${ville.img}`} alt="" />
                        <div className="ville-layer">
                            <p>{ville.description}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default VilleList;
