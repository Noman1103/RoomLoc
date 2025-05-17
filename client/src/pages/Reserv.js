import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

import '../components/styles/Reservation.css'

const Reserv = () => {
  const [reservs,setReserv] = useState([]);
  const id = sessionStorage.getItem("id");
  useEffect(() => {
    getReservation();
    // eslint-disable-next-line
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getReservation = () => {
    if(id){
      axios.post('http://localhost/backend/get_reserv.php',{
        id: id})
      .then(res => {
        setReserv(res.data);
      })
    }
  }
 
  return (
    <div className='reservation'>
      <h1>Vos réservations</h1>
      <table className='table-reservation'>
        <thead>
          <tr>
            <th>Réservation</th>
            <th>Nom du logement</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Nombre de personnes</th>
            <th>Prix total</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {reservs.map((reserv,key) => 
            <tr key={reserv.id_reservation}>
              <td>{(key+1)}</td>
              <td>{reserv.title}</td>
              <td>{formatDate(new Date(reserv.date_debut))}</td>
              <td>{formatDate(new Date(reserv.date_fin))}</td>
              <td>{reserv.nombre_de_personnes}</td>
              <td>{reserv.prix_total}</td>
              <td>
                <Button className="button yes" variant="contained" onClick={""}>
                  Valider
                </Button>
                <Button className="button no" variant="contained" onClick={""}>
                  Annuler
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Reserv;
