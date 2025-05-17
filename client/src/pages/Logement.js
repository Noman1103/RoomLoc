import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { Button, Modal, Box } from '@mui/material';
import { differenceInDays, isWithinInterval, subDays  } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import MapsButton from '../components/Maps';
import '../components/styles/Logement.css'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import { IoLocationSharp } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { MdBedroomChild } from "react-icons/md";
import { FaUser,FaEnvelope,FaPhone } from "react-icons/fa";




const Logement = () => {
  const { idLoge } = useParams();
  const [infoLogement,setInfoLogement] = useState([]);
  const [images,setImages] = useState([]);
  const [propi,setPropi] = useState([]);
  const [date, setDate] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [total,setTotal] = useState(0);

  const navigate = useNavigate();

  const title = infoLogement.length > 0 ? infoLogement[0].title : null;
  const adresse = infoLogement.length > 0 ? infoLogement[0].adresse : null;
  const ville = infoLogement.length > 0 ? infoLogement[0].ville : null;
  const pays = infoLogement.length > 0 ? infoLogement[0].pays : null;
  const cp = infoLogement.length > 0 ? infoLogement[0].code_postal : null;
  const tl = infoLogement.length > 0 ? infoLogement[0].type_de_logement : null;
  const nc = infoLogement.length > 0 ? infoLogement[0].nombre_de_chambres : null;
  const np = infoLogement.length > 0 ? infoLogement[0].nombres_personnes : null;
  const prix = infoLogement.length > 0 ? infoLogement[0].prix_par_nuit : null;  
  const descri = infoLogement.length > 0 ? infoLogement[0].description : null; 
  
  const nom = propi.length > 0 ? propi[0].nom : null;
  const prenom = propi.length > 0 ? propi[0].prenom : null;
  const mail = propi.length > 0 ? propi[0].email : null;
  const tel = propi.length > 0 ? propi[0].tel : null;

  const id = sessionStorage.getItem("id");
  const statut = sessionStorage.getItem("statut");
  
  const adresses = `${adresse} ${cp} ${ville}`;

  useEffect(() => {
    getLogement();
    getDates();
    // eslint-disable-next-line
  }, []);

  // Récupérer les infos logements
  const getLogement = () => {
    axios.post('http://localhost/backend/logement.php', {id: idLoge})
    .then(res => {
      setInfoLogement(res.data.logements);
      setImages(res.data.images);
      setPropi(res.data.propi);
      console.log(propi);
    });
  }

  // Récupérer les jours de réservation 
  const getDates = () => {
    let start = formatDate(startDate);
    let end = formatDate(endDate);

    if(end === ''){
      end = formatDate(startDate);
    }
    axios.post('http://localhost/backend/get_date.php', {
      id: idLoge,
      start: start,
      end: end
    })
    .then(res => {
      setDate(res.data);
    });
  }

  // Datepicker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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

  //Jours exclu pour Date picker
  const convertDates = (dates) => {
    return dates.map(date => ({
      start: subDays(new Date(date.date_debut),1) ,
      end: new Date(date.date_fin)
    }));
  };

  const isDateExcluded = (date, excludedRanges) => {
    return excludedRanges.some(range =>
      isWithinInterval(date, { start: range.start, end: range.end })
    );
  };

  const excludedRanges = convertDates(date);

  // Réservation
  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleClick = (e) => {
    e.preventDefault();
    let start = formatDate(startDate);
    let end = formatDate(endDate);

    if(end === ''){
      end = formatDate(startDate);
    }

    if(statut==='loca'){
      const reservation = { id, start , end , idLoge , np , prix }
      axios.post('http://localhost/backend/create_reservation.php', reservation);
      toast.success("Réservation validée",{
        duration: 3000,
        position: 'top-center',
        style: {
          border: '1px solid #264e86',
          color: '#264e86',
          marginTop: '9rem'
        }
      });
      setTimeout(() => {
        window.location.reload();
      },3000);
      setOpenModal(false);
    } else if (statut==='propri'){
      toast.error("Vous êtes propriétaire, connectez-vous en tant que locataire",{
        duration: 3000,
        position: 'top-center',
        style: {
          border: '1px solid #264e86',
          color: '#264e86',
          marginTop:'6rem'
        }
      });
      setOpenModal(false);
    } else if (!statut) {
      toast.error("Vous n'êtes pas connécté, connectez-vous",{
        duration: 3000,
        position: 'top-center',
        style: {
          border: '1px solid #264e86',
          color: '#264e86'
        }
      });
      setTimeout(() => {
        navigate('/connexion');
        window.location.reload();
      },3500);
    }
  }

  // Modal réservation
  const handleOpen = () => {
    if((startDate || endDate) == null ){
      toast.error("Veuillez indiquer vos dates",{
        duration: 3000,
        position: 'bottom-right',
        style: {
          border: '1px solid #264e86',
          margin: '0 21.5rem 10rem 0',
          color: '#264e86'
        }
      });
    } else {
      setOpenModal(true);
      const start = formatDate(startDate);
      const end = formatDate(endDate);
      const diffDays = differenceInDays(end, start);
      setTotal(total + (diffDays * prix));
    }
  }

  const handleClose = () => {
    setOpenModal(false);
    setTotal(0);
  }

  return (
    <div className='logement'>
      <div className='info-important'>
        <span className='title'>{title}</span>
        <div className='loc'>
          <IoLocationSharp />
          <span>{adresse}</span>,
          <span>{cp}</span>
          <span>{ville}</span>,
          <span>{pays}</span>
        </div>
      </div>
      <div className='container'>
        <div className='carousel-box'>
          <Carousel>
            {images.map(image => (
              <div className='image'>
                <img className='image' src={`../img/id_logement/${infoLogement[0].id_logement}/${image}`} alt=""/>
              </div>
            ))}
          </Carousel>
        </div>
        <div className='info-secondaire'>
          <div className='info-container'>
            <div className='info-box'><span>{tl}</span></div>
            <div className='info-box'><span><HiUsers />{np} Voyageurs</span></div>
            <div className='info-box'><span><MdBedroomChild />{nc} Chambres</span></div>
            <div className='info-box'><span>{prix}€ par nuit</span></div>
          </div>
          <div className='description'>
            <span>{descri}</span>
          </div>
          <div className='info-third'>
          <Toaster />
            <DatePicker
              locale={locale}
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              filterDate={date => !isDateExcluded(date, excludedRanges)}
              selectsRange
              inline
            />
            <div className='button'>
              <MapsButton adress={adresses}/>
              <div className='info-logement'>
                <div className='info'><FaUser />{nom} {prenom}</div>
                <div className='info'><FaEnvelope />{mail} </div>
                <div className='info'><FaPhone />{tel}</div>
                </div>
              <button className='button-reservation' onClick={handleOpen}>Réserver</button>
              <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-reservation"
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'auto%',
                    height: 'auto%',
                    bgcolor: '#eff0f4',
                    boxShadow: 24,
                    borderRadius:'0.5rem'
                  }}
                >
                  <p className='validation'>Votre coût total est de {total} €</p>
                  <p className='validation validate'>Valider la réservation</p>
                  <div className='button-validation'>
                    <Button className="button-validation-yes" variant="contained" onClick={handleClick}>
                      Oui
                    </Button>
                    <Button className="button-validation-no" variant="contained" onClick={handleClose}>
                      Non
                    </Button>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logement;