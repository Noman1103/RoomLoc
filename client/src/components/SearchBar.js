import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import axios from 'axios';

import "./styles/SearchBar.css"
import 'react-datepicker/dist/react-datepicker.module.css'

const SearchBar = () => {
    const { ville } = useParams();
    const [villes,setVille] = useState('');
    const [country, setCountry] = useState('');
    // const [villeCountry, setVilleCountry] = useState('');
    const [autoVille, setAutoVille] = useState([]);

    const [timer, setTimer] = useState(null);

    const [dateStart,setDateStart] = useState(null);
    const [dateEnd,setDateSEnd] = useState(null);

    const [counterA, setCounterA] = useState(0);
    const [counterC, setCounterC] = useState(0);
    const [counterR, setCounterR] = useState(0);

    const [isVisible, setIsVisible] = useState(true);
    
    const navigate = useNavigate();

    const display = document.querySelector(".autocomplete-destination");

    // DatePicker
    const onChange = (dates) => {
        const [start, end] = dates;
        setDateStart(start);
        setDateSEnd(end);
    };

    const days = ['Di','Lu','Ma','Me','Je','Ve','Sa'];
    const months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

    const locale = {
        localize: {
            day: n => days[n],
            month: n => months[n]
        },
        formatLong: {
            date: () => 'mm/dd/yyyy'
        }
    }

    // Autocomplete
    const handleVilleChange = (e) => {
        setVille(e.target.value);

        if(timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            handleSearch(e.target.value);
        }, 500);
      
        setTimer(newTimer);
    }; 

    const handleSearch = async (value) => {
        const username = 'noman1103';
        const input = document.querySelector(".destination")

        if (value.length >= 2) {
            const response = await axios.get(`http://api.geonames.org/searchJSON?q=${villes}&maxRows=5&username=${username}`);
            setAutoVille(response.data.geonames);
            display.classList.add("display");
        } else {
            setAutoVille([]);
        }

        if(value.length < 3 || value.length === 0) {
            display.classList.remove("display");
        }
        
        document.addEventListener('mouseover',function mouseover(event){
            if(!input.contains(event.target) && !display.contains(event.target)){
                display.classList.remove("display");
            }
        })    
    };

    const handleSuggestionClick = (name,pays) => {
        const names = name;
        const countrys = pays;
        setVille(names);
        setCountry(countrys);
        setAutoVille([]);

        // if(names.length && countrys.length){
        //     setVilleCountry(`${ville} ${country}`)
        // }
    };

    // Redirection page Search
    const handleSubmit = (e) => {
        e.preventDefault();
        const formatDate = (date) => {
            if (!date) return '';
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };
        const start = formatDate(dateStart);
        const end = formatDate(dateEnd);

        const total = counterC + counterA;
        
        const room = () => {
            if(counterR > 0){
                return `&rooms=${counterR}`;
            } else return '';
        }
        const rooms = room();

        navigate(`/search/${villes}?pays=${country}&startDay=${start}&endDay=${end}&total=${total}${rooms}`);

        if(ville){window.location.reload();}
    };

    // Bouton Dynamique pour voyageurs
    const handleDisplayCustomers = (e) => {
        const box = document.getElementById("box");
        e.preventDefault();
        setIsVisible(!isVisible);
        if(isVisible){
            box.classList.add("block");
        } else {
            box.classList.remove("block");
            handleAddText();
        }
    };

    const handleAddText = () => {
        const text = document.querySelector(".customers_add");
        let total = '';
        let room = '';
        if(counterA > 0 || counterC > 0){
            total = `${counterA + counterC} Voyageurs`;
        }
        if(counterR > 0){
            room = `${counterR} Chambres`
        }
        if(total.length > 0 || room.length > 0){
            text.innerHTML = `${total} ${room}`
        } else {
            text.innerHTML = `Ajouter`
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const box = document.getElementById("box");
            const button = document.getElementById("button");
            if (!box.contains(event.target) && !button.contains(event.target)) {
                box.classList.remove('block');
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
        document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleIncrementAdultes = (e) => {
        e.preventDefault();
        const adults = document.querySelector(".adults");
        const more = adults.querySelector(".more");
        const less = adults.querySelector(".less");

        if(more.contains(e.target)){
            setCounterA(counterA + 1);
        } else if (less.contains(e.target)){
            setCounterA(counterA - 1);
        }
    }

    const handleIncrementChilds = (e) => {
        e.preventDefault();
        const childs = document.querySelector(".childs");
        const more = childs.querySelector(".more");
        const less = childs.querySelector(".less");

        if(more.contains(e.target)){
            setCounterC(counterC + 1);
        } else if (less.contains(e.target)){
            setCounterC(counterC - 1);
        }
    }

    const handleIncrementRooms = (e) => {
        e.preventDefault();
        const rooms = document.querySelector(".rooms");
        const more = rooms.querySelector(".more");
        const less = rooms.querySelector(".less");

        if(more.contains(e.target)){
            setCounterR(counterR + 1);
        } else if (less.contains(e.target)){
            setCounterR(counterR - 1);
        }
    }

    return (
        <div className="search-bar">
            <form className="container" onSubmit={handleSubmit}>
                <div className="destination">
                    <span className="destination-text">Destination : </span>
                    <input type="text" className="destination-input" required placeholder={"Tapez votre destination"} onChange={handleVilleChange} 
                    value={villes}/>
                    <div className="autocomplete-destination">
                        {autoVille.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion.name,suggestion.countryName)}
                                className="destination-item"
                            >
                                {suggestion.name}, {suggestion.countryName}
                            </li>
                        ))}
                    </div>
                </div>
                <div className="start-day">
                    <span className="start-day-text">Check-in - Check-out :</span>
                    <DatePicker 
                        locale={locale}
                        selected={dateStart} 
                        onChange={onChange}  
                        startDate={dateStart} 
                        endDate={dateEnd} 
                        selectsRange
                        className="start-day-input"
                        placeholderText="Arrivée/Départ"
                        required
                    />
                </div>
                <div className="customers">
                    <span className="customers-text">Voyageurs - Chambres</span>
                    <button id="button" className="customers-button" onClick={handleDisplayCustomers}><span className="customers_add">Ajouter</span></button>
                    <div id="box"className="customers-box">
                        <div className="customers-items adults">
                            <span>Adultes</span>
                            <button id="button" className="less" onClick={handleIncrementAdultes}><h2>-</h2></button>
                            <span>{counterA}</span>
                            <button id="button" className="more" onClick={handleIncrementAdultes}><h2>+</h2></button>
                        </div>
                        <div className="customers-items childs">
                            <span>Enfants</span>
                            <button id="button" className="less" onClick={handleIncrementChilds}><h2>-</h2></button>
                            <span>{counterC}</span>
                            <button id="button" className="more" onClick={handleIncrementChilds}><h2>+</h2></button>
                        </div>
                        <div className="customers-items rooms">
                            <span>Chambres</span>
                            <button id="button" className="less" onClick={handleIncrementRooms}><h2>-</h2></button>
                            <span>{counterR}</span>
                            <button id="button" className="more" onClick={handleIncrementRooms}><h2>+</h2></button>
                        </div>
                    </div>
                </div>
                <input type="submit" className="search-button" value="Rechercher"/>
            </form>
        </div>
    )
};

export default SearchBar;